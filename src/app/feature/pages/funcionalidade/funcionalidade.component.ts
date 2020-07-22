import { AlertMessage } from '../../../core/utils/alert-message';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { finalize } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

import { GridColumnDefs, GridSearchParams } from 'grid';
import { GridOptions } from 'ag-grid';

import { NovaFuncionalidadeService } from '../../../feature/services/nova-funcionalidade.service';
import { PesquisaInterface } from '../../../core/interfaces/pesquisa-interface';
import { RotasEnum } from '../../../core/enums/rotas-enum';

@Component({
    selector: 'app-funcionalidade',
    templateUrl: './funcionalidade.component.html',
    styleUrls: ['./funcionalidade.component.scss']
})
export class FuncionalidadeComponent implements OnInit, OnDestroy {
    public gridView: boolean;
    public loading: boolean;
    private $dadosGrid: Subject<any>;
    private $colunasGrid: Array<GridColumnDefs>;
    private $dataValue: any;
    private $sub: Subscription;
    private $pageConfig: GridOptions;

    constructor(
        private router: Router,
        private alertMessage: AlertMessage,
        private novaFuncionalidadeService: NovaFuncionalidadeService
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

    public ngOnInit(): void {}

    public ngOnDestroy(): void {
        this.$sub.unsubscribe();
    }

    public onRowClicked(dadosLinha: PesquisaInterface): void {
        void this.router.navigate([RotasEnum.VISUALIZAR_PESQUISA, dadosLinha.id]);
    }

    public get colunasGrid(): Array<GridColumnDefs> {
        this.$colunasGrid = [
            new GridColumnDefs('Nome Empresarial', 'ds_nome_empresarial', 250),
            new GridColumnDefs('CNPJ', 'ds_cnpj', 140),
            new GridColumnDefs('Número de Registro', 'ds_numero_registro', 108),
            new GridColumnDefs('Endereço', 'ds_endereco', 218)
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

    public formDataValue(evento: any): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.$dataValue = evento.form;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        this.pesquisar(evento.form);
    }

    public pesquisar(formValue, novosParametros = { limit: 50, offset: 0 }): Subscription {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { nomeEmpresarial } = formValue;

        if (nomeEmpresarial) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            formValue.nomeEmpresarial = encodeURIComponent(nomeEmpresarial);
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const parametros = Object.assign(formValue, novosParametros);
        this.$dadosGrid.next('Carregando');
        this.loading = true;
        this.$sub = this.novaFuncionalidadeService
            .pesquisar(parametros)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe(
                (response) => {
                    this.$dadosGrid.next(response);
                },
                (erro: HttpErrorResponse) => {
                    this.alertMessage.alert(erro.message, 'danger');
                    this.$dadosGrid.next([]);
                }
            );
        this.gridView = true;
        return this.$sub;
    }
}
