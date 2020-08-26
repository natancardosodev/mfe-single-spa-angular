import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaskPipe } from './pipes/mask.pipe';
import { CardsComponent } from './components/cards/cards.component';

@NgModule({
    declarations: [MaskPipe, CardsComponent],
    exports: [MaskPipe, CardsComponent],
    imports: [CommonModule]
})
export class SharedModule {}
