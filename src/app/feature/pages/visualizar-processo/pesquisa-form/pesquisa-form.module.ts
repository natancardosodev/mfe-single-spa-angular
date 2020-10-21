import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

import { PesquisaFormComponent } from './pesquisa-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [PesquisaFormComponent],
    imports: [CommonModule, ReactiveFormsModule, TextMaskModule, SharedModule],
    exports: [PesquisaFormComponent]
})
export class PesquisaFormModule {}
