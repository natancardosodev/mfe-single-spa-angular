import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

import { InputDateModule } from './../../../components/input-date/input-date.module';
import { PesquisaFormComponent } from './pesquisa-form.component';

@NgModule({
  declarations: [PesquisaFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextMaskModule,
    InputDateModule
  ],
  exports: [PesquisaFormComponent]
})
export class PesquisaFormModule { }
