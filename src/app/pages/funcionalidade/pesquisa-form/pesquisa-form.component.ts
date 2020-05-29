import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AlertMessage } from './../../../util/alert-message';
import { TextMaskFactory } from '../../../util/mask/text-mask-factory';
import { PesquisaForm } from './pesquisa.form';

@Component({
  selector: 'app-pesquisa-form',
  templateUrl: './pesquisa-form.component.html',
  styleUrls: ['./pesquisa-form.component.scss']
})
export class PesquisaFormComponent implements OnInit {

  @Input() public loading: boolean;
  @Output() public dataForm: EventEmitter<any>;
  public dateMin: Date;
  public dateMax: Date;
  private $pesquisaForm: PesquisaForm;
  private $maskFactory: TextMaskFactory;

  constructor(
    private $alertMessage: AlertMessage
  ) {
    this.dataForm = new EventEmitter();
    this.$maskFactory = new TextMaskFactory();
    this.$pesquisaForm = new PesquisaForm();
    this.dateMax = new Date();
  }

  public ngOnInit() {
    this.setDateMin();
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
        const parametros = this.pesquisaForm.getValuesFormated();
        this.dataForm.emit({ form: parametros });
        return;
      }
      return;
    }

    this.$alertMessage.alert('Informe pelo menos um campo para pesquisa');
  }

  public setDateMin(): void {
    this.pesquisaForm.dataInicial.valueChanges.subscribe(date => {
      this.dateMin = date;
    });
  }

  public isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).dirty;
  }

  public isEmpty(dado): boolean {
    return JSON.stringify(dado) === '{}';
  }

}
