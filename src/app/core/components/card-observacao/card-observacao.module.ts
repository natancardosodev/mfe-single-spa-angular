import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CardObservacaoComponent } from './card-observacao.component';

@NgModule({
    declarations: [CardObservacaoComponent],
    imports: [CommonModule, ReactiveFormsModule],
    exports: [CardObservacaoComponent]
})
export class CardObservacaoModule {}
