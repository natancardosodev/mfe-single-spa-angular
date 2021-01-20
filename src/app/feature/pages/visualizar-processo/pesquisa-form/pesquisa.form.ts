import { FormGroup, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';

import { isValidCpf } from '@brazilian-utils/is-valid-cpf';
import { clearMask } from 'src/app/core/configs/regexClearMask';
import { StorageUtil } from 'src/app/core/utils/storage.util';
import { Storage } from 'src/app/core/enums/storage.enum';
import { PesquisaInterface } from 'src/app/core/interfaces/pesquisa/pesquisa-interface';
import { GeneralsUtil } from 'src/app/core/utils/generals.util';

export class PesquisaForm extends FormGroup {
    private _errorMessages = {
        required: 'O campo %s é obrigatório.',
        quantidadeInvalida: 'Quantidade Inválida de dígitos',
        valorInvalido: 'O valor informado no campo %s é inválido',
        maiorQueDataAtual: 'A data informada é maior que a atual'
    };

    constructor() {
        super({
            protocolo: new FormControl(null),
            cpf: new FormControl(null),
            tipo: new FormControl(null),
            statusProcesso: new FormControl(null),
            dataInicial: new FormControl(null),
            dataFinal: new FormControl(null)
        });

        this.protocolo.setValidators([PesquisaForm.validaQuantidaDeDigito(13), PesquisaForm.validaUfProtocolo()]);

        this.cpf.setValidators([PesquisaForm.validaQuantidaDeDigito(11), PesquisaForm.validaCpf()]);

        this.dataInicial.setValidators([
            PesquisaForm.validaPeriodo(new FormControl(new Date()), this.dataInicial, {
                // maiorQueDataAtual: true
            })
        ]);

        this.dataFinal.setValidators([
            PesquisaForm.validaPeriodo(new FormControl(new Date()), this.dataFinal, {
                // maiorQueDataAtual: true
            })
        ]);
    }

    public static validaUfProtocolo(): ValidatorFn {
        const ufUsuario: string = StorageUtil.get(Storage.DADOS_USUARIO).estado;
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
        return this.get('protocolo');
    }

    public get cpf(): AbstractControl {
        return this.get('cpf');
    }

    public get tipo(): AbstractControl {
        return this.get('tipo');
    }

    public get statusProcesso(): AbstractControl {
        return this.get('statusProcesso');
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
            ...this.value,
            dataInicial: this.value.dataInicial ? new Date(this.value.dataInicial).toLocaleDateString('fr-CA') : null,
            dataFinal: this.value.dataFinal ? new Date(this.value.dataFinal).toLocaleDateString('fr-CA') : null
        };
    }

    public getFirstErrorFrom(controlName: string, label: string): string {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        return this._errorMessages[Object.keys(this.get(controlName).errors)[0]].replace('%s', label || controlName);
    }

    public markAllAsTouched(): void {
        Object.keys(this.controls).map((control) => this.get(control).markAsTouched());
    }

    public setValues(data: PesquisaInterface): void {
        this.protocolo.setValue(data.protocolo);
        this.cpf.setValue(data.cpf);
        this.statusProcesso.setValue(data.statusProcesso);
        this.tipo.setValue(data.tipo);
        this.dataInicial.setValue(GeneralsUtil.formatDateEnToBr(data.dataInicial));
        this.dataFinal.setValue(GeneralsUtil.formatDateEnToBr(data.dataFinal));
    }

    private deleteControlValuesNull(): void {
        for (const control in this.value) {
            if (this.value[control] === null || this.value[control] === '') {
                delete this.value[control];
            }
        }
    }
}
