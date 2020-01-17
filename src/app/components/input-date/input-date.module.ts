import { ptBrLocale } from 'ngx-bootstrap/locale';
import { locale } from './datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { InputDateComponent } from './input-date.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


defineLocale(locale, ptBrLocale);

@NgModule({
  declarations: [InputDateComponent],
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [
    InputDateComponent
  ]
})
export class InputDateModule { }
