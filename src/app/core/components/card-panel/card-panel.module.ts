import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoadingLocalModule } from '@voxtecnologia/vox-preload';

import { CardPanelComponent } from './card-panel.component';
@NgModule({
    imports: [CommonModule, LoadingLocalModule, NgbModule],
    declarations: [CardPanelComponent],
    exports: [CardPanelComponent]
})
export class CardPanelModule {}
