import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskPipe } from './pipes/mask.pipe';
import { UppercaseDirective } from './directives/uppercase.directive';

@NgModule({
    declarations: [MaskPipe, UppercaseDirective],
    exports: [MaskPipe, UppercaseDirective],
    imports: [CommonModule]
})
export class SharedModule {}
