import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { finalize } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

import { GridColumnDefs, GridSearchParams } from 'grid';
import { AlertService } from 'lib-alert';
import { GridOptions } from 'ag-grid';

import { FuncionalidadeService } from '../../services/funcionalidade.service';
import { PesquisaInterface } from '../../interfaces/pesquisa-interface';
import { RotasEnum } from './../../enum/rotas-enum';

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
    private alertService: AlertService,
    private funcionalidadeService: FuncionalidadeService
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

  public ngOnInit() {
  }

  public ngOnDestroy(): void {
    this.$sub.unsubscribe();
  }

  public onRowClicked(dadosLinha: PesquisaInterface): void {
    this.router.navigate([RotasEnum.VISUALIZAR_PESQUISA, dadosLinha.id]);
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

  public get dadosGrid() {
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
    this.$dataValue = evento.form;
    this.pesquisar(evento.form);
  }

  public pesquisar(formValue, novosParametros = { limit: 50, offset: 0 }): Subscription {
    const { nomeEmpresarial } = formValue;

    if (nomeEmpresarial) {
      formValue.nomeEmpresarial = encodeURIComponent(nomeEmpresarial);
    }

    const parametros = Object.assign(formValue, novosParametros);
    this.$dadosGrid.next('Carregando');
    this.loading = true;
    this.$sub = this.funcionalidadeService.pesquisar(parametros)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(response => {
        this.$dadosGrid.next(response);
      }, (erro: HttpErrorResponse) => {
        this.alert(erro.message);
        this.$dadosGrid.next([]);
      });
    this.gridView = true;
    return this.$sub;
  }

  private alert(message: any): void {
    this.alertService.openModal({
      message: `<strong>${message}</strong>`,
      title: 'Atenção',
      alert: 'warning',
    });
  }

}
