import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { PaginaNaoEncontradaRoutingModule } from './pagina-nao-encontrada.routing.module';

@NgModule({
    declarations: [PaginaNaoEncontradaComponent],
    imports: [CommonModule, PaginaNaoEncontradaRoutingModule]
})
export class PaginaNaoEncontradaModule {}
