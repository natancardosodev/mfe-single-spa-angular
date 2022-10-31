import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LibVoxUiModule } from 'lib-vox-ui';
import { CardObservacaoComponent } from './card-observacao.component';

@NgModule({
    declarations: [CardObservacaoComponent],
    imports: [CommonModule, ReactiveFormsModule, LibVoxUiModule],
    exports: [CardObservacaoComponent]
})
export class CardObservacaoModule {}
