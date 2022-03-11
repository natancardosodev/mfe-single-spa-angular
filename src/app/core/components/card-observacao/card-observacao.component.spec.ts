import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardObservacaoComponent } from './card-observacao.component';

describe('CardObservacaoComponent', () => {
    let component: CardObservacaoComponent;
    let fixture: ComponentFixture<CardObservacaoComponent>;

    beforeEach(waitForAsync(() => {
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
