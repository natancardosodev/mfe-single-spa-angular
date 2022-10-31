import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LibVoxUiModule } from 'lib-vox-ui';
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
        LibVoxUiModule,
        CardPessoaModule,
        CardDocumentosModule,
        CardObservacaoModule,
        ModalIndeferirModule
    ],
    exports: [VisualizarPesquisaComponent]
})
export class VisualizarPesquisaModule {}
