import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VisualizarPesquisaComponent } from './visualizar-pesquisa.component';

describe('VisualizarPesquisaComponent', () => {
  let component: VisualizarPesquisaComponent;
  let fixture: ComponentFixture<VisualizarPesquisaComponent>;

  beforeEach(waitForAsync(() => {
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
