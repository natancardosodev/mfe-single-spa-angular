import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibVoxUiModule } from 'lib-vox-ui';
import { ModalConfirmacaoComponent } from './modal-confirmacao.component';

@NgModule({
    declarations: [ModalConfirmacaoComponent],
    imports: [CommonModule, LibVoxUiModule],
    exports: [ModalConfirmacaoComponent]
})
export class ModalConfirmacaoModule {}
