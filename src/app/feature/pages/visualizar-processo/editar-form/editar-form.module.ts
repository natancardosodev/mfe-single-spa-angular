import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LibVoxUiModule } from 'lib-vox-ui';

import { CardDocumentosModule } from '@core/components/card-documentos/card-documentos.module';
import { EditarFormComponent } from './editar-form.component';

@NgModule({
    declarations: [EditarFormComponent],
    imports: [CommonModule, CardDocumentosModule, LibVoxUiModule],
    exports: [EditarFormComponent]
})
export class EditarFormModule {}
