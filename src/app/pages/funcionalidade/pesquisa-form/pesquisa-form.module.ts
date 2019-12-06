import { PesquisaFormComponent } from './pesquisa-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';



@NgModule({
  declarations: [PesquisaFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  exports: [PesquisaFormComponent]
})
export class PesquisaFormModule { }
