import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AlertService } from 'lib-alert';

import { TextMaskFactory } from './../../../util/mask/text-mask-factory';
import { PesquisaForm } from './pesquisa.form';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pesquisa-form',
  templateUrl: './pesquisa-form.component.html',
  styleUrls: ['./pesquisa-form.component.scss']
})
export class PesquisaFormComponent implements OnInit {

  @Input() public loading: boolean;
  @Output() public dataForm: EventEmitter<any>;
  private $pesquisaForm: PesquisaForm;
  private $maskFactory: TextMaskFactory;

  constructor(private alertService: AlertService) {
    this.dataForm = new EventEmitter();
    this.$maskFactory = new TextMaskFactory();
    this.$pesquisaForm = new PesquisaForm();
  }

  public ngOnInit() {
  }

  public get pesquisaForm(): PesquisaForm {
      return this.$pesquisaForm;
  }

  public get maskFactory(): TextMaskFactory {
      return this.$maskFactory;
  }

  public pesquisar(): void {
    const formValue = this.pesquisaForm.getDadosForm();

    if (!this.isEmpty(formValue)) {
      if (this.$pesquisaForm.valid) {
        const parametros = Object.assign(formValue);
        this.dataForm.emit({ form: parametros });
        return;
      }
      return;
    }

    this.alert('Informe pelo menos um campo para pesquisa');
  }

  public isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).dirty;
  }

  public isEmpty(dado): boolean {
    return JSON.stringify(dado) === '{}';
  }

  private alert(message: any): void {
    this.alertService.openModal({
      message: `<strong>${message}</strong>`,
      title: 'Atenção',
      alert: 'warning',
    });
  }

}
