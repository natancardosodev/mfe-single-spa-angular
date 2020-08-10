import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CardsModule, FlapsModule } from 'lib-cards-genericos';

import { VisualizarPesquisaRoutingModule } from './visualizar-pesquisa-routing.module';
import { VisualizarPesquisaComponent } from './visualizar-pesquisa.component';
import { CardProcessoModule } from 'src/app/core/components/card-processo/card-processo.module';
import { CardPessoaModule } from 'src/app/core/components/card-pessoa/card-pessoa.module';
import { CardTaxasModule } from 'src/app/core/components/card-taxas/card-taxas.module';
import { CardDocumentosModule } from 'src/app/core/components/card-documentos/card-documentos.module';
import { CardHistoricoModule } from 'src/app/core/components/card-historico/card-historico.module';
import { CardObservacoesModule } from 'src/app/core/components/card-observacoes/card-observacoes.module';
import { CardExigenciasModule } from 'src/app/core/components/card-exigencias/card-exigencias.module';

@NgModule({
    declarations: [VisualizarPesquisaComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        VisualizarPesquisaRoutingModule,
        FlapsModule.forRoot([]),
        CardsModule.forRoot([]),
        CardProcessoModule,
        CardPessoaModule,
        CardTaxasModule,
        CardDocumentosModule,
        CardHistoricoModule,
        CardObservacoesModule,
        CardExigenciasModule
    ],
    exports: [VisualizarPesquisaComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VisualizarPesquisaModule {}
