import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardProcessoComponent } from './card-processo.component';

describe('CardProcessoComponent', () => {
  let component: CardProcessoComponent;
  let fixture: ComponentFixture<CardProcessoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CardProcessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
