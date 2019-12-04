import { VisualizarPesquisaComponent } from './visualizar-pesquisa.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { VisualizarPesquisaRoutingModule } from './visualizar-pesquisa-routing.module';

@NgModule({
  declarations: [VisualizarPesquisaComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    VisualizarPesquisaRoutingModule
  ],
  exports: [VisualizarPesquisaComponent]
})
export class VisualizarPesquisaModule { }
