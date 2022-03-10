import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibUIModule } from 'lib-ui-interno';

import { SharedModule } from '@shared/shared.module';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { PaginaNaoEncontradaRoutingModule } from './pagina-nao-encontrada.routing.module';

@NgModule({
    declarations: [PaginaNaoEncontradaComponent],
    imports: [CommonModule, PaginaNaoEncontradaRoutingModule, LibUIModule, SharedModule]
})
export class PaginaNaoEncontradaModule {}
