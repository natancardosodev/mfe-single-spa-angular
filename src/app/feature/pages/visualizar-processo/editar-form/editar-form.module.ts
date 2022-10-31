import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibVoxUiModule } from 'lib-vox-ui';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxCurrencyModule } from 'ngx-currency';

import { customCurrencyMaskConfig } from '@core/configs/currencyMask';
import { CardDocumentosModule } from '@core/components/card-documentos/card-documentos.module';
import { EditarRoutingModule } from './editar-form-routing.module';
import { EditarFormComponent } from './editar-form.component';

@NgModule({
    declarations: [EditarFormComponent],
    imports: [
        CommonModule,
        EditarRoutingModule,
        TextMaskModule,
        CardDocumentosModule,
        NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
        LibVoxUiModule
    ],
    exports: [EditarFormComponent]
})
export class EditarFormModule {}
