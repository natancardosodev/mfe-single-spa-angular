import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxCurrencyModule } from 'ngx-currency';

import { EditarRoutingModule } from './editar-form-routing.module';
import { EditarFormComponent } from './editar-form.component';
import { customCurrencyMaskConfig } from 'src/app/core/configs/currencyMask';
import { CardDocumentosModule } from 'src/app/core/components/card-documentos/card-documentos.module';
import { LibUIModule } from 'lib-ui-interno';

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
