import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPanelModule } from './../card-panel/card-panel.module';
import { CardOficioComponent } from './card-oficio.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CardOficioComponent],
    imports: [CommonModule, ReactiveFormsModule, CardPanelModule],
    exports: [CardOficioComponent]
})
export class CardOficioModule {}
