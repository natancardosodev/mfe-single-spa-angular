import { CardOficioModule } from '../../../../core/components/card-oficio/card-oficio.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CardsModule, FlapsModule } from 'lib-cards-genericos';

import { CardDocumentosModule } from '../../../../core/components/card-documentos/card-documentos.module';
import { VisualizarPesquisaRoutingModule } from './visualizar-pesquisa-routing.module';
import { VisualizarPesquisaComponent } from './visualizar-pesquisa.component';

@NgModule({
    declarations: [VisualizarPesquisaComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        VisualizarPesquisaRoutingModule,
        FlapsModule.forRoot([]),
        CardsModule.forRoot([]),
        CardOficioModule,
        CardDocumentosModule
    ],
    exports: [VisualizarPesquisaComponent]
})
export class VisualizarPesquisaModule {}
