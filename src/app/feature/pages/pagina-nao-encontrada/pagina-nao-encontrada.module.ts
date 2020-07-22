import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { PaginaNaoEncontradaRoutingModule } from './pagina-nao-encontrada.routing.module';

@NgModule({
    declarations: [PaginaNaoEncontradaComponent],
    imports: [CommonModule, PaginaNaoEncontradaRoutingModule]
})
export class PaginaNaoEncontradaModule {}
