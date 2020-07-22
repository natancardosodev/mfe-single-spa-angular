import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskPipe } from './pipes/mask.pipe';

@NgModule({
    declarations: [MaskPipe],
    exports: [MaskPipe],
    imports: [CommonModule]
})
export class SharedModule {}
