import { FormGroup, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';

import { isValidCpf } from '@brazilian-utils/is-valid-cpf';
import { clearMask } from 'src/app/core/configs/regexClearMask';
import { StorageUtil } from 'src/app/core/utils/storage.util';

export class PesquisaForm extends FormGroup {
    private $errorMessages = {
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

    public static validaUfProtocolo(): ValidatorFn {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const ufUsuario: string = StorageUtil.get('user').estado;
        const prefixoProtocolo = `${ufUsuario}E`;

        return (control: AbstractControl): any => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            const ufProtocolo = control.value ? control.value.substring(0, 3).toUpperCase() : '';
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (ufProtocolo.length > 0 && ufProtocolo !== prefixoProtocolo) {
                return { valorInvalido: true };
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
        return this.get('status');
    }

    public getDadosForm(): any {
        this.deleteControlValuesNull();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.value;
    }

    public get dataInicial(): AbstractControl {
        return this.get('dataInicial');
    }

    public get dataFinal(): AbstractControl {
        return this.get('dataFinal');
    }

    public getValuesFormated(): any {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return {
            ...this.value,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            dataInicial: this.value.dataInicial ? new Date(this.value.dataInicial).toLocaleDateString('fr-CA') : null,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            dataFinal: this.value.dataInicial ? new Date(this.value.dataInicial).toLocaleDateString('fr-CA') : null
        };
    }

    public getFirstErrorFrom(controlName: string, label: string): string {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        return this.$errorMessages[Object.keys(this.get(controlName).errors)[0]].replace('%s', label || controlName);
    }

    public markAllAsTouched(): void {
        Object.keys(this.controls).map((control) => this.get(control).markAsTouched());
    }

    private deleteControlValuesNull(): void {
        for (const control in this.value) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (this.value[control] === null || this.value[control] === '') {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                delete this.value[control];
            }
        }
    }
}
