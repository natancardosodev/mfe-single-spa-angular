import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LibUIModule } from 'lib-ui-interno';
import { VisualizarPesquisaRoutingModule } from './visualizar-pesquisa-routing.module';
import { VisualizarPesquisaComponent } from './visualizar-pesquisa.component';
import { CardProcessoModule } from 'src/app/core/components/card-processo/card-processo.module';
import { CardPessoaModule } from 'src/app/core/components/card-pessoa/card-pessoa.module';
import { CardDocumentosModule } from 'src/app/core/components/card-documentos/card-documentos.module';
import { ModalIndeferirModule } from 'src/app/core/components/modal-indeferir/modal-indeferir.module';
import { CardObservacaoModule } from 'src/app/core/components/card-observacao/card-observacao.module';

@NgModule({
    declarations: [VisualizarPesquisaComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        VisualizarPesquisaRoutingModule,
        LibUIModule,
        CardProcessoModule,
        CardPessoaModule,
        CardDocumentosModule,
        CardObservacaoModule,
        ModalIndeferirModule
    ],
    exports: [VisualizarPesquisaComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VisualizarPesquisaModule {}
