import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextMaskModule } from 'angular2-text-mask';
import { LibVoxUiModule } from 'lib-vox-ui';

import { PesquisaFormComponent } from './pesquisa-form.component';

@NgModule({
    declarations: [PesquisaFormComponent],
    imports: [CommonModule, LibVoxUiModule, TextMaskModule],
    exports: [PesquisaFormComponent]
})
export class PesquisaFormModule {}
