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
import { RotasEnum } from '../../../core/enums/rotas.enum';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { MaskPipe } from 'src/app/shared/pipes/mask.pipe';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
    selector: 'app-visualizar-processo',
    templateUrl: './visualizar-processo.component.html',
    styleUrls: ['./visualizar-processo.component.scss']
})
export class VisualizarProcessoComponent {
    public gridView: boolean;
    public loading: boolean;
    private _dadosGrid: Subject<any>;
    private _colunasGrid: Array<GridColumnDefs>;
    private _dataValue: any;
    private _sub: Subscription;
    private _pageConfig: GridOptions;

    constructor(
        private solicitacaoService: SolicitacaoService,
        private alertService: AlertService,
        private router: Router
    ) {
        this._dadosGrid = new Subject();
        this._dataValue = {};
        this.gridView = false;
        this.loading = false;
        this._pageConfig = {
            paginationPageSize: 10,
            cacheBlockSize: 0,
            rowHeight: 55
        };
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public onRowClicked(dadosLinha: any): void {
        void this.router.navigate([RotasEnum.EMPRESA_VISUALIZAR, dadosLinha.id]);
    }

    public get colunasGrid(): Array<GridColumnDefs> {
        this._colunasGrid = [
            new GridColumnDefs('Protocolo', 'protocolo', 150),
            new GridColumnDefs('Nome', 'nome', 295),
            new GridColumnDefs('CPF', 'cpf', 140),
            new GridColumnDefs('Tipo', 'tipo', 108),
            new GridColumnDefs('Protocolado', 'data_protocolado', 130)
        ];

        return this._colunasGrid;
    }

    public get pageConfig(): GridOptions {
        return this._pageConfig;
    }

    public get dadosGrid(): Subject<any> {
        return this._dadosGrid;
    }

    public onGridUpdate(parametrosGrid: GridSearchParams): boolean | Subscription {
        const parametros = {
            orderBy: parametrosGrid.sort,
            sortBy: parametrosGrid.colId,
            limit: parametrosGrid.limit,
            offset: parametrosGrid.offset
        };

        return !this._dataValue || this.pesquisar(this._dataValue, parametros);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public formDataValue(evento: any): void {
        this._dataValue = evento.form;
        this.pesquisar(evento.form);
    }

    public pesquisar(formValue: PesquisaInterface, novosParametros = { limit: 50, offset: 0 }): Subscription {
        const { protocolo } = formValue;

        if (protocolo) {
            formValue.protocolo = encodeURIComponent(protocolo);
        }

        const parametros = Object.assign(formValue, novosParametros);
        this._dadosGrid.next('Carregando');
        this.loading = true;
        this._sub = this.solicitacaoService
            .getListarProcessos(parametros)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe(
                (response) => {
                    this._dadosGrid.next({ ...response, processos: this.formatarDadosPesquisa(response) });
                },
                (erro: HttpErrorResponse) => {
                    this.alertService.openModal('Erro', erro.message, 'danger');
                    this._dadosGrid.next([]);
                }
            );
        this.gridView = true;
        return this._sub;
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
