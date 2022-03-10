import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LibUIModule } from 'lib-ui-interno';
import { CardPessoaModule } from '@core/components/card-pessoa/card-pessoa.module';
import { CardDocumentosModule } from '@core/components/card-documentos/card-documentos.module';
import { ModalIndeferirModule } from '@core/components/modal-indeferir/modal-indeferir.module';
import { CardObservacaoModule } from '@core/components/card-observacao/card-observacao.module';
import { VisualizarPesquisaRoutingModule } from './visualizar-pesquisa-routing.module';
import { VisualizarPesquisaComponent } from './visualizar-pesquisa.component';

@NgModule({
    declarations: [VisualizarPesquisaComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        VisualizarPesquisaRoutingModule,
        LibUIModule,
        CardPessoaModule,
        CardDocumentosModule,
        CardObservacaoModule,
        ModalIndeferirModule
    ],
    exports: [VisualizarPesquisaComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VisualizarPesquisaModule {}
