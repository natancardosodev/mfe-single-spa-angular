import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardObservacaoComponent } from './card-observacao.component';

describe('CardObservacaoComponent', () => {
    let component: CardObservacaoComponent;
    let fixture: ComponentFixture<CardObservacaoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CardObservacaoComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardObservacaoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
