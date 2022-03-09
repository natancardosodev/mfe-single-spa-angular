import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardPessoaComponent } from './card-pessoa.component';

describe('CardPessoaComponent', () => {
  let component: CardPessoaComponent;
  let fixture: ComponentFixture<CardPessoaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CardPessoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
