import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidatorFn } from '@angular/forms';

import { isValidCpf } from '@brazilian-utils/is-valid-cpf';
import { StorageEnum } from '@core/enums/sistema/storage.enum';
import { FormFieldGridPesquisa } from '@core/enums/visualizar-processo/form-grid-pesquisa.enum';
import { ParametrosPesquisaInterface } from '@core/interfaces/visualizar-processo/pesquisa.interface';
import { formatDateBrToEn, formatDateEnToBr } from '@core/utils/date.util';
import { StorageUtil } from '@core/utils/storage.util';
import { clearMask } from 'lib-vox-shared-codes';

export class PesquisaForm extends UntypedFormGroup {
    private _errorMessages = {
        required: 'O campo %s é obrigatório.',
        quantidadeInvalida: 'Quantidade Inválida de dígitos',
        valorInvalido: 'O valor informado no campo %s é inválido',
        maiorQueDataAtual: 'A data informada é maior que a atual'
    };

    constructor() {
        super({
            [FormFieldGridPesquisa.protocolo]: new UntypedFormControl(null),
            [FormFieldGridPesquisa.cpf]: new UntypedFormControl(null),
            [FormFieldGridPesquisa.tipo]: new UntypedFormControl(null),
            [FormFieldGridPesquisa.statusProcesso]: new UntypedFormControl(null),
            [FormFieldGridPesquisa.dataInicial]: new UntypedFormControl(null),
            [FormFieldGridPesquisa.dataFinal]: new UntypedFormControl(null)
        });

        this.protocolo.setValidators([PesquisaForm.validaQuantidaDeDigito(13), PesquisaForm.validaUfProtocolo()]);

        this.cpf.setValidators([PesquisaForm.validaQuantidaDeDigito(11), PesquisaForm.validaCpf()]);

        this.dataInicial.setValidators([
            PesquisaForm.validaPeriodo(new UntypedFormControl(new Date()), this.dataInicial, {
                // maiorQueDataAtual: true
            })
        ]);

        this.dataFinal.setValidators([
            PesquisaForm.validaPeriodo(new UntypedFormControl(new Date()), this.dataFinal, {
                // maiorQueDataAtual: true
            })
        ]);
    }

    public static validaUfProtocolo(): ValidatorFn {
        const ufUsuario: string = StorageUtil.get(StorageEnum.DADOS_USUARIO).estado;
        const prefixoProtocolo = `${ufUsuario}E`;

        return (control: AbstractControl): any => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const ufProtocolo = control.value ? control.value.substring(0, 3).toUpperCase() : '';
            if (ufProtocolo.length > 0 && ufProtocolo !== prefixoProtocolo) {
                return { valorInvalido: true };
            }
        };
    }

    private static validaQuantidaDeDigito(quantidade: number): ValidatorFn {
        return (control: AbstractControl): any => {
            const conteudo = control.value ? clearMask(control.value) : '';

            if (conteudo.length > 0 && conteudo.length < quantidade) {
                return { quantidadeInvalida: true };
            }
        };
    }

    private static validaCpf(): ValidatorFn {
        return (control: AbstractControl): any => {
            const cpf = control.value ? clearMask(control.value) : '';

            if (!isValidCpf(cpf) && cpf.length === 11) {
                return { valorInvalido: true };
            }
        };
    }

    private static validaPeriodo(
        dataInicial: AbstractControl,
        dataFinal: AbstractControl,
        mensagemErro: Record<string, string>
    ): ValidatorFn {
        return (): any => {
            if (dataInicial.value < dataFinal.value) {
                return mensagemErro;
            }
        };
    }

    public get protocolo(): AbstractControl {
        return this.get([FormFieldGridPesquisa.protocolo]);
    }

    public get cpf(): AbstractControl {
        return this.get([FormFieldGridPesquisa.cpf]);
    }

    public get tipo(): AbstractControl {
        return this.get([FormFieldGridPesquisa.tipo]);
    }

    public get statusProcesso(): AbstractControl {
        return this.get([FormFieldGridPesquisa.statusProcesso]);
    }

    public get dataInicial(): AbstractControl {
        return this.get([FormFieldGridPesquisa.dataInicial]);
    }

    public get dataFinal(): AbstractControl {
        return this.get([FormFieldGridPesquisa.dataFinal]);
    }

    public getDadosForm(): ParametrosPesquisaInterface {
        this.deleteControlValuesNull();
        return this.value;
    }

    public getValuesFormated(): ParametrosPesquisaInterface {
        return {
            ...this.value,
            dataInicial: this.value.dataInicial ? formatDateBrToEn(this.value.dataInicial) : null,
            dataFinal: this.value.dataFinal ? formatDateBrToEn(this.value.dataFinal) : null
        };
    }

    public getFirstErrorFrom(controlName: string, label: string): string {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        return this._errorMessages[Object.keys(this.get(controlName).errors)[0]].replace('%s', label || controlName);
    }

    public markAllAsTouched(): void {
        Object.keys(this.controls).map((control) => this.get(control).markAsTouched());
    }

    public setValues(data: ParametrosPesquisaInterface): void {
        this.protocolo.setValue(data.protocolo);
        this.cpf.setValue(data.cpf);
        this.statusProcesso.setValue(data.statusProcesso);
        this.tipo.setValue(data.tipo);
        this.dataInicial.setValue(formatDateEnToBr(data.dataInicial));
        this.dataFinal.setValue(formatDateEnToBr(data.dataFinal));
    }

    private deleteControlValuesNull(): void {
        for (const control in this.value) {
            if (this.value[control] === null || this.value[control] === '') {
                delete this.value[control];
            }
        }
    }
}
