import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { VisualizarProcessoComponent } from "./visualizar-processo.component";

describe("VisualizarProcessoComponent", () => {
  let component: VisualizarProcessoComponent;
  let fixture: ComponentFixture<VisualizarProcessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizarProcessoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
