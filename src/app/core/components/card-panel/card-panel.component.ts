import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';

import { CardResponse } from './card-response.util';
@Component({
    selector: 'app-card-panel',
    templateUrl: './card-panel.component.html',
    styleUrls: ['./card-panel.component.scss']
})
export class CardPanelComponent {
    @Input() public id: string;
    @Input() public title: string;
    @Input() public cardStatus: boolean;
    @Input() public activeIds: string;
    @Input() public erroStatus: 'erro' | 'vazio' | undefined;
    @Output() public panelOpen: EventEmitter<string>;

    constructor(config: NgbAccordionConfig) {
        this.panelOpen = new EventEmitter();
        config.type = 'card';
    }

    /**
     * emite um evento caso o card seja aberto
     * @param * event
     * @memberof CardPanelComponent
     */
    onPanelChange(event: any): void {
        if (event.nextState) {
            this.panelOpen.emit(event.panelId);
        }
    }

    public get erroInfo(): { statusClass: string; label: string } {
        return CardResponse.erroLabel(this.erroStatus);
    }

    public tentarNovamente(): void {
        this.panelOpen.emit();
    }
}
