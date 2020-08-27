import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { GridModule } from 'grid';

import { PesquisaFormModule } from './pesquisa-form/pesquisa-form.module';
import { VisualizarProcessoRoutingModule } from './visualizar-processo-routing.module';

import { VisualizarProcessoComponent } from './visualizar-processo.component';
import { VisualizarPesquisaModule } from './visualizar-pesquisa/visualizar-pesquisa.module';

@NgModule({
    declarations: [VisualizarProcessoComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        VisualizarProcessoRoutingModule,
        GridModule,
        PesquisaFormModule,
        VisualizarPesquisaModule
    ],
    exports: [VisualizarProcessoComponent]
})
export class VisualizarProcessoModule {}