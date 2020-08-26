import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ModalIndeferirComponent } from './modal-indeferir.component';

@NgModule({
    declarations: [ModalIndeferirComponent],
    imports: [CommonModule, ReactiveFormsModule, ModalModule],
    exports: [ModalIndeferirComponent]
})
export class ModalIndeferirModule {}
