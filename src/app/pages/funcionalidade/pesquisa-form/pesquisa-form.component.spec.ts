import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaFormComponent } from './pesquisa-form.component';

describe('PesquisaFormComponent', () => {
  let component: PesquisaFormComponent;
  let fixture: ComponentFixture<PesquisaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
