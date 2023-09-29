import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibVoxUiModule } from 'lib-vox-ui';

import { PesquisaFormComponent } from './pesquisa-form.component';

@NgModule({
    declarations: [PesquisaFormComponent],
    imports: [CommonModule, LibVoxUiModule],
    exports: [PesquisaFormComponent]
})
export class PesquisaFormModule {}
