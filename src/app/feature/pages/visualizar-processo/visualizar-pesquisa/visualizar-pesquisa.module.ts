import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { VisualizarPesquisaRoutingModule } from './visualizar-pesquisa-routing.module';
import { VisualizarPesquisaComponent } from './visualizar-pesquisa.component';
import { CardProcessoModule } from 'src/app/core/components/card-processo/card-processo.module';
import { CardPessoaModule } from 'src/app/core/components/card-pessoa/card-pessoa.module';
import { CardDocumentosModule } from 'src/app/core/components/card-documentos/card-documentos.module';

@NgModule({
    declarations: [VisualizarPesquisaComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        VisualizarPesquisaRoutingModule,
        CardProcessoModule,
        CardPessoaModule,
        CardDocumentosModule
    ],
    exports: [VisualizarPesquisaComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VisualizarPesquisaModule {}
