import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaskPipe } from './pipes/mask.pipe';
import { CardsComponent } from './components/cards/cards.component';
import { AlertModule } from './components/alert/alert.module';
import { InputDateModule } from './components/input-date/input-date.module';
import { AlertComponent } from './components/alert/alert.component';
import { InputDateComponent } from './components/input-date/input-date.component';

@NgModule({
    declarations: [MaskPipe, CardsComponent],
    exports: [MaskPipe, CardsComponent, AlertComponent, InputDateComponent],
    imports: [CommonModule, AlertModule, InputDateModule]
})
export class SharedModule {}
