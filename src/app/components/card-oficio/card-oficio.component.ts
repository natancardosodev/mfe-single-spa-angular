import { OficioForm } from './oficio.form';
import { Component, OnInit } from '@angular/core';
import { LoadingLocalService } from '@voxtecnologia/vox-preload';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-card-oficio',
  templateUrl: './card-oficio.component.html',
  styleUrls: ['./card-oficio.component.scss']
})
export class CardOficioComponent implements OnInit {

  public cardId: string;
  public cardTitle: string;
  public activeIds: string;
  public responseError: 'erro' | 'vazio' | undefined;
  private $dadosOficio: any;
  private $oficioForm: OficioForm;

  constructor(
    private loadingLocal: LoadingLocalService,
  ) {
    this.cardId = 'dadosOficio';
    this.activeIds = 'dadosOficio';
    this.cardTitle = 'Ofício';
    this.$oficioForm = new OficioForm();
  }

  ngOnInit() {
  }

  public get dadosOficio(): any {
    return this.$dadosOficio;
  }

  public get oficioForm(): OficioForm {
    return this.$oficioForm;
  }

  public isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).dirty;
  }

  public onPanelOpen(): void {
    this.loadingLocal.show(this.cardId);
  }

}
