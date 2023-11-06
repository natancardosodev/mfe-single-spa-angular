import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { CardDocumentosModule } from '@core/components/card-documentos/card-documentos.module';
import { CardObservacaoModule } from '@core/components/card-observacao/card-observacao.module';
import { CardPessoaModule } from '@core/components/card-pessoa/card-pessoa.module';
import { ModalIndeferirModule } from '@core/components/modal-indeferir/modal-indeferir.module';
import { LibVoxUiModule } from 'lib-vox-ui';
import { VisualizarPesquisaComponent } from './visualizar-pesquisa.component';

@NgModule({
    declarations: [VisualizarPesquisaComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        LibVoxUiModule,
        CardPessoaModule,
        CardDocumentosModule,
        CardObservacaoModule,
        ModalIndeferirModule
    ],
    exports: [VisualizarPesquisaComponent]
})
export class VisualizarPesquisaModule {}
