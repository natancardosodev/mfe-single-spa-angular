import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaskPipe } from './pipes/mask.pipe';
import { CardsComponent } from './components/cards/cards.component';
import { InputDateModule } from './components/input-date/input-date.module';
import { InputDateComponent } from './components/input-date/input-date.component';

@NgModule({
    declarations: [MaskPipe, CardsComponent],
    exports: [MaskPipe, CardsComponent, InputDateComponent],
    imports: [CommonModule, InputDateModule]
})
export class SharedModule {}
