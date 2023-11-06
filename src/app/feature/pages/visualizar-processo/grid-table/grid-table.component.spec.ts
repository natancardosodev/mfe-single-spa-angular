import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GridTableComponent } from './grid-table.component';

describe('GridTableComponent', () => {
    let component: GridTableComponent;
    let fixture: ComponentFixture<GridTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [GridTableComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GridTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
