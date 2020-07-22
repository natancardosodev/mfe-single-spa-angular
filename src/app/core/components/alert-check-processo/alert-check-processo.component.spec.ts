import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertCheckProcessoComponent } from './alert-check-processo.component';

describe('AlertCheckProcessoComponent', () => {
  let component: AlertCheckProcessoComponent;
  let fixture: ComponentFixture<AlertCheckProcessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertCheckProcessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertCheckProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
