/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { finalize } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

import { GridColumnDefs, GridSearchParams } from 'grid';
import { GridOptions } from 'ag-grid';

import { PesquisaInterface } from '../../../core/interfaces/pesquisa/pesquisa-interface';
import { RotasEnum } from '../../../core/enums/rotas-enum';
import { AlertMessage } from '../../../core/utils/alert-message';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { MaskPipe } from 'src/app/shared/pipes/mask.pipe';

@Component({
    selector: 'app-visualizar-processo',
    templateUrl: './visualizar-processo.component.html',
    styleUrls: ['./visualizar-processo.component.scss']
})
export class VisualizarProcessoComponent {
    public gridView: boolean;
    public loading: boolean;
    private $dadosGrid: Subject<any>;
    private $colunasGrid: Array<GridColumnDefs>;
    private $dataValue: any;
    private $sub: Subscription;
    private $pageConfig: GridOptions;

    constructor(
        private solicitacaoService: SolicitacaoService,
        private alertMessage: AlertMessage,
        private router: Router
    ) {
        this.$dadosGrid = new Subject();
        this.$dataValue = {};
        this.gridView = false;
        this.loading = false;
        this.$pageConfig = {
            paginationPageSize: 10,
            cacheBlockSize: 0,
            rowHeight: 55
        };
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public onRowClicked(dadosLinha: any): void {
        void this.router.navigate([RotasEnum.VISUALIZAR_PROCESSO, dadosLinha.id]);
    }

    public get colunasGrid(): Array<GridColumnDefs> {
        this.$colunasGrid = [
            new GridColumnDefs('Protocolo', 'protocolo', 150),
            new GridColumnDefs('Nome', 'nome', 295),
            new GridColumnDefs('CPF', 'cpf', 140),
            new GridColumnDefs('Tipo', 'tipo', 108),
            new GridColumnDefs('Protocolado', 'data_protocolado', 130)
        ];

        return this.$colunasGrid;
    }

    public get pageConfig(): GridOptions {
        return this.$pageConfig;
    }

    public get dadosGrid(): Subject<any> {
        return this.$dadosGrid;
    }

    public onGridUpdate(parametrosGrid: GridSearchParams): boolean | Subscription {
        const parametros = {
            orderBy: parametrosGrid.sort,
            sortBy: parametrosGrid.colId,
            limit: parametrosGrid.limit,
            offset: parametrosGrid.offset
        };

        return !this.$dataValue || this.pesquisar(this.$dataValue, parametros);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public formDataValue(evento: any): void {
        this.$dataValue = evento.form;
        this.pesquisar(evento.form);
    }

    public pesquisar(formValue: PesquisaInterface, novosParametros = { limit: 50, offset: 0 }): Subscription {
        const { protocolo } = formValue;

        if (protocolo) {
            formValue.protocolo = encodeURIComponent(protocolo);
        }

        const parametros = Object.assign(formValue, novosParametros);
        this.$dadosGrid.next('Carregando');
        this.loading = true;
        this.$sub = this.solicitacaoService
            .getListarProcessos(parametros)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe(
                (response) => {
                    this.$dadosGrid.next({ ...response, processos: this.formatarDadosPesquisa(response) });
                },
                (erro: HttpErrorResponse) => {
                    this.alertMessage.alert(erro.message, 'danger');
                    this.$dadosGrid.next([]);
                }
            );
        this.gridView = true;
        return this.$sub;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public formatarDadosPesquisa(dados): Array<any> {
        if (dados) {
            const mask = new MaskPipe();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            dados = dados.processos.map((processo) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return {
                    ...processo,
                    cpf: mask.transform(processo.cpf, 'cpf')
                };
            });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return dados;
        }
    }
}
