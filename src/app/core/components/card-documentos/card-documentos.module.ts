import { CardDocumentosComponent } from './card-documentos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardUploadModule } from 'vox-upload';

@NgModule({
    declarations: [CardDocumentosComponent],
    imports: [CommonModule, CardUploadModule],
    exports: [CardDocumentosComponent]
})
export class CardDocumentosModule {}
