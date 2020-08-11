import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPessoaComponent } from './card-pessoa.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [CardPessoaComponent],
    imports: [CommonModule, SharedModule],
    exports: [CardPessoaComponent]
})
export class CardPessoaModule {}
