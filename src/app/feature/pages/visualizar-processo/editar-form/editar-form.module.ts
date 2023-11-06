import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LibVoxUiModule } from 'lib-vox-ui';
import { NgxCurrencyModule } from 'ngx-currency';

import { CardDocumentosModule } from '@core/components/card-documentos/card-documentos.module';
import { customCurrencyMaskConfig } from '@core/configs/currencyMask';
import { EditarFormComponent } from './editar-form.component';

@NgModule({
    declarations: [EditarFormComponent],
    imports: [CommonModule, CardDocumentosModule, NgxCurrencyModule.forRoot(customCurrencyMaskConfig), LibVoxUiModule],
    exports: [EditarFormComponent]
})
export class EditarFormModule {}
