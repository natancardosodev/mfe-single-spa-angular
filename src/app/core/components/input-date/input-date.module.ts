import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ptBrLocale } from 'ngx-bootstrap/locale';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';

import { locale } from './datepicker';
import { InputDateComponent } from './input-date.component';

defineLocale(locale, ptBrLocale);

@NgModule({
    declarations: [InputDateComponent],
    imports: [CommonModule, FormsModule, BsDatepickerModule.forRoot()],
    exports: [InputDateComponent]
})
export class InputDateModule {}
