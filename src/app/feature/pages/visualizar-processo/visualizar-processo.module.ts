import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { VisualizarProcessoRoutingModule } from './visualizar-processo-routing.module';

import { EditarFormModule } from './editar-form/editar-form.module';
import { GridTableModule } from './grid-table/grid-table.module';
import { PesquisaFormModule } from './pesquisa-form/pesquisa-form.module';
import { VisualizarPesquisaModule } from './visualizar-pesquisa/visualizar-pesquisa.module';
import { VisualizarProcessoComponent } from './visualizar-processo.component';

@NgModule({
    declarations: [VisualizarProcessoComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        VisualizarProcessoRoutingModule,
        GridTableModule,
        EditarFormModule,
        PesquisaFormModule,
        VisualizarPesquisaModule
    ],
    exports: [VisualizarProcessoComponent]
})
export class VisualizarProcessoModule {}
