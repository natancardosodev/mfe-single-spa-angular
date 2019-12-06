import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOficioComponent } from './card-oficio.component';

describe('CardOficioComponent', () => {
  let component: CardOficioComponent;
  let fixture: ComponentFixture<CardOficioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardOficioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOficioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
