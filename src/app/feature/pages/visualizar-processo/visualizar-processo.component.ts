import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { finalize, take } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

import { GridColumnDefs, GridSearchParams } from 'grid';
import { GridOptions } from 'ag-grid';
import { AlertService } from 'lib-ui-interno';

import { RotasEnum } from '@core/enums/interno/rotas.enum';
import { SolicitacaoService } from '@feature/services/solicitacao.service';
import { MaskPipe } from '@shared/pipes/mask.pipe';
import {
    DadosGridInterface,
    GridPesquisaInterface,
    ParametrosPesquisaInterface
} from '@core/interfaces/visualizar-processo/pesquisa.interface';

@Component({
    selector: 'app-visualizar-processo',
    templateUrl: './visualizar-processo.component.html',
    styleUrls: ['./visualizar-processo.component.scss']
})
export class VisualizarProcessoComponent {
    public gridView: boolean;
    public loading: boolean;
    private _dadosGrid: Subject<Array<DadosGridInterface> | string>;
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

    public onRowClicked(dadosLinha: any): void {
        if (dadosLinha) {
            void this.router.navigate([RotasEnum.VISUALIZARPROCESSO_VISUALIZAR, dadosLinha.id]);
        }
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

    public get dadosGrid(): Subject<Array<DadosGridInterface> | string> {
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

    public formDataValue(evento: any): void {
        this._dataValue = evento.form;
        this.pesquisar(evento.form);
    }

    public pesquisar(formValue: ParametrosPesquisaInterface, novosParametros = { limit: 50, offset: 0 }): Subscription {
        const { protocolo } = formValue;

        if (protocolo) {
            formValue.protocolo = encodeURIComponent(protocolo);
        }

        const parametros = Object.assign(formValue, novosParametros);
        this._dadosGrid.next('Carregando...');
        this.loading = true;
        this._sub = this.solicitacaoService
            .getListarProcessos(parametros)
            .pipe(
                finalize(() => {
                    this.loading = false;
                }),
                take(1)
            )
            .subscribe(
                (response) => {
                    this._dadosGrid.next({ ...response, processos: this.formatarDadosPesquisa(response) });
                },
                (erro: HttpErrorResponse) => {
                    this.alertService.openModal({ title: 'Erro', message: erro.message, style: 'danger' });
                    this._dadosGrid.next([]);
                }
            );
        this.gridView = true;
        return this._sub;
    }

    public formatarDadosPesquisa(dados: GridPesquisaInterface): Array<DadosGridInterface> {
        if (dados) {
            const mask = new MaskPipe();
            const dadosFormatted: Array<DadosGridInterface> = dados.processos.map((processo) => {
                return {
                    ...processo,
                    cpf: mask.transform(processo.cpf, 'cpf'),
                    data_protocolado: mask.transform(processo.data_protocolado, 'data')
                };
            });
            return dadosFormatted;
        }
    }
}
