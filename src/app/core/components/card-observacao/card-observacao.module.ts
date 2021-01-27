import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LibUIModule } from 'lib-ui-interno';
import { CardObservacaoComponent } from './card-observacao.component';

@NgModule({
    declarations: [CardObservacaoComponent],
    imports: [CommonModule, ReactiveFormsModule, LibUIModule],
    exports: [CardObservacaoComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CardObservacaoModule {}
