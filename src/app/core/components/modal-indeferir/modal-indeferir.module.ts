import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibVoxUiModule } from 'lib-vox-ui';
import { ModalIndeferirComponent } from './modal-indeferir.component';

@NgModule({
    declarations: [ModalIndeferirComponent],
    imports: [CommonModule, LibVoxUiModule],
    exports: [ModalIndeferirComponent]
})
export class ModalIndeferirModule {}
