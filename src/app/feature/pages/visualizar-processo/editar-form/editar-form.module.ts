import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibUIModule } from 'lib-ui-interno';
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
        LibUIModule
    ],
    exports: [EditarFormComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditarFormModule {}
