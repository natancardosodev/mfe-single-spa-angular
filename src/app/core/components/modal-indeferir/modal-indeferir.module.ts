import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibUIModule } from 'lib-ui-interno';
import { ModalIndeferirComponent } from './modal-indeferir.component';

@NgModule({
    declarations: [ModalIndeferirComponent],
    imports: [CommonModule, LibUIModule],
    exports: [ModalIndeferirComponent]
})
export class ModalIndeferirModule {}
