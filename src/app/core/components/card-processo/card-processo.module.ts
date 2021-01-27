import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibUIModule } from 'lib-ui-interno';
import { CardProcessoComponent } from './card-processo.component';

@NgModule({
    declarations: [CardProcessoComponent],
    imports: [CommonModule, LibUIModule],
    exports: [CardProcessoComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CardProcessoModule {}
