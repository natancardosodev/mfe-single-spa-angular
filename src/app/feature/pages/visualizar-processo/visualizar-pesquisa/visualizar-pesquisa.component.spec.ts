import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarPesquisaComponent } from './visualizar-pesquisa.component';

describe('VisualizarPesquisaComponent', () => {
  let component: VisualizarPesquisaComponent;
  let fixture: ComponentFixture<VisualizarPesquisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarPesquisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
