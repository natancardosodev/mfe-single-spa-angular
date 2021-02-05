import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextMaskModule } from 'angular2-text-mask';
import { LibUIModule } from 'lib-ui-interno';

import { PesquisaFormComponent } from './pesquisa-form.component';

@NgModule({
    declarations: [PesquisaFormComponent],
    imports: [CommonModule, LibUIModule, TextMaskModule],
    exports: [PesquisaFormComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PesquisaFormModule {}
