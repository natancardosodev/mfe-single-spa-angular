import { FormGroup, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';

import { isValidCnpj } from '@brazilian-utils/is-valid-cnpj';
import { isValidCpf } from '@brazilian-utils/is-valid-cpf';
import * as moment from 'moment';
import { clearMask } from 'src/configs/regexClearMask';

export class PesquisaForm extends FormGroup {

    private $errorMessages = {
        required: 'O campo %s é obrigatório.',
        quantidadeInvalida: 'Quantidade Inválida de dígitos',
        nomeEmpresarialMinLength: 'O nome empresarial deve ter no mínimo 3 caracteres',
        valorInvalido: 'O valor informado no campo %s é inválido',
        maiorQueDataAtual: 'A data informada é maior que a atual'
    };

    constructor() {
        super({
            cnpj: new FormControl(null),
            numeroRegistro: new FormControl(null),
            nomeEmpresarial: new FormControl(null),
            cpfMembroQsa: new FormControl(null),
            dataInicial: new FormControl(null),
            dataFinal: new FormControl(null)
        });

        this.cnpj.setValidators([
            PesquisaForm.validaQuantidaDeDigito(14),
            PesquisaForm.validaCpfCnpj()
        ]);

        this.nomeEmpresarial.setValidators([
            PesquisaForm.validaQuantidaDeDigito(3, true),
        ]);

        this.cpfMembroQsa.setValidators([
            PesquisaForm.validaQuantidaDeDigito(11),
            PesquisaForm.validaCpfCnpj()
        ]);

        this.numeroRegistro.setValidators([
            PesquisaForm.validaQuantidaDeDigito(11),
        ]);

        this.dataFinal.setValidators([
          PesquisaForm.validaPeriodo(new FormControl(new Date()), this.dataFinal, {maiorQueDataAtual: true})
        ]);
    }

    private static validaQuantidaDeDigito(quantidade: number, nomeEmpresarial: boolean = false): ValidatorFn {
        return (control: AbstractControl): any => {
            const conteudo = control.value ? clearMask(control.value) : '';

            if (conteudo.length > 0 && conteudo.length < quantidade) {

                if (nomeEmpresarial) {
                    return { nomeEmpresarialMinLength: true };
                }

                return { quantidadeInvalida: true };
            }
        };
    }

    private static validaCpfCnpj(): ValidatorFn {
        return (control: AbstractControl): any => {
            const cpfCnpj = control.value ? clearMask(control.value) : '';

            if (!isValidCnpj(cpfCnpj) && cpfCnpj.length === 14) {
                return { valorInvalido: true };
            }

            if (!isValidCpf(cpfCnpj) && cpfCnpj.length === 11) {
                return { valorInvalido: true };
            }
        };
    }

    private static validaPeriodo(dataInicial: AbstractControl, dataFinal: AbstractControl, mensagemErro: object): ValidatorFn {
      return (): any => {
        if (dataInicial.value < dataFinal.value) {
          return mensagemErro;
        }
      };
    }

    public get cnpj(): AbstractControl {
        return this.get('cnpj');
    }

    public get numeroRegistro(): AbstractControl {
      return this.get('numeroRegistro');
    }

    public get nomeEmpresarial(): AbstractControl {
      return this.get('nomeEmpresarial');
    }

    public get cpfMembroQsa(): AbstractControl {
      return this.get('cpfMembroQsa');
    }

    public getDadosForm(): any {
      this.deleteControlValuesNull();
      return this.value;
    }

    public get dataInicial(): AbstractControl {
      return this.get('dataInicial');
    }

    public get dataFinal(): AbstractControl {
      return this.get('dataFinal');
    }

    public getValuesFormated(): any {
      return {
        ... this.value,
        dataInicial: moment(this.value.dataInicial).format('DD/MM/AAAA'),
        dataFinal: moment(this.value.dataFinal).format('DD/MM/AAAA')
      };
    }

    public getFirstErrorFrom(controlName: string, label: string): string {
        return this.$errorMessages[Object.keys(this.get(controlName).errors)[0]].replace('%s', label || controlName);
    }

    public markAllAsTouched(): void {
        Object.keys(this.controls).map(control => this.get(control).markAsTouched());
    }

    private deleteControlValuesNull(): void {
        for (const control in this.value) {
            if (this.value[control] === null || this.value[control] === '') {
                delete this.value[control];
            }
        }
    }

}
