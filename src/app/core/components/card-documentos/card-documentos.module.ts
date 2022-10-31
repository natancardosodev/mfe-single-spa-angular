import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibVoxUiModule } from 'lib-vox-ui';
import { CardDocumentosComponent } from './card-documentos.component';

@NgModule({
    declarations: [CardDocumentosComponent],
    imports: [CommonModule, LibVoxUiModule],
    exports: [CardDocumentosComponent]
})
export class CardDocumentosModule {}
