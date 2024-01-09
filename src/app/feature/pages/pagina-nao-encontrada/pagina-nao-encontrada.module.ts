import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LibVoxUiModule } from 'lib-vox-ui';

import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { PaginaNaoEncontradaRoutingModule } from './pagina-nao-encontrada.routing.module';

@NgModule({
    declarations: [PaginaNaoEncontradaComponent], // @todo import backbuttondirective
    imports: [CommonModule, PaginaNaoEncontradaRoutingModule, LibVoxUiModule]
})
export class PaginaNaoEncontradaModule {}
