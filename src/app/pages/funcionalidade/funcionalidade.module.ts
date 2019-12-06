import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { GridModule } from 'grid';

import { PesquisaFormModule } from './pesquisa-form/pesquisa-form.module';
import { VisualizarPesquisaModule } from './visualizar-pesquisa/visualizar-pesquisa.module';
import { FuncionalidadeRoutingModule } from './funcionalidade-routing.module';
import { FuncionalidadeComponent } from './funcionalidade.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [FuncionalidadeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FuncionalidadeRoutingModule,
    GridModule,
    PesquisaFormModule,
    VisualizarPesquisaModule
  ],
  exports: [FuncionalidadeComponent]
})
export class FuncionalidadeModule { }
