import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskPipe } from './pipes/mask.pipe';
import { UppercaseDirective } from './directives/uppercase.directive';
import { BackButtonDirective } from './directives/back-button.directive';
import { ExternalLinkDirective } from './directives/external-link.directive';

@NgModule({
    declarations: [MaskPipe, UppercaseDirective, BackButtonDirective, ExternalLinkDirective],
    exports: [MaskPipe, UppercaseDirective, BackButtonDirective, ExternalLinkDirective],
    imports: [CommonModule]
})
export class SharedModule {}
