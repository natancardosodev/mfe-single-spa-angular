import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibVoxUiModule } from 'lib-vox-ui';

import { SharedModule } from '@shared/shared.module';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { PaginaNaoEncontradaRoutingModule } from './pagina-nao-encontrada.routing.module';

@NgModule({
    declarations: [PaginaNaoEncontradaComponent],
    imports: [CommonModule, PaginaNaoEncontradaRoutingModule, LibVoxUiModule, SharedModule]
})
export class PaginaNaoEncontradaModule {}
