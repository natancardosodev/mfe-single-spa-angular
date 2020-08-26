import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIndeferirComponent } from './modal-indeferir.component';

describe('ModalIndeferirComponent', () => {
    let component: ModalIndeferirComponent;
    let fixture: ComponentFixture<ModalIndeferirComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalIndeferirComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalIndeferirComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
