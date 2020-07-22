import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDocumentosComponent } from './card-documentos.component';

describe('CardDocumentosComponent', () => {
  let component: CardDocumentosComponent;
  let fixture: ComponentFixture<CardDocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDocumentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
