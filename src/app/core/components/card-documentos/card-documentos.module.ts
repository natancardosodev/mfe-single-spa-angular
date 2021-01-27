import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibUIModule } from 'lib-ui-interno';
import { CardDocumentosComponent } from './card-documentos.component';

@NgModule({
    declarations: [CardDocumentosComponent],
    imports: [CommonModule, LibUIModule],
    exports: [CardDocumentosComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CardDocumentosModule {}
