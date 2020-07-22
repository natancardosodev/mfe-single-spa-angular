/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { FormGroup, FormControl, AbstractControl, Validators, ValidatorFn } from '@angular/forms';

import { isValidCpf } from '@brazilian-utils/is-valid-cpf';

import { regexClearCpfCnpj } from 'src/app/core/configs/regexCpfCnpj';
import { clearMask } from 'src/app/core/configs/regexClearMask';
import { PessoaInterface } from 'src/app/core/interfaces/pessoa.interface';
import { Pessoa } from 'src/app/core/models/pessoa';

export class PessoaForm extends FormGroup {
    private _errorMessages = {
        required: 'O campo %s é obrigatório.',
        valorInvalido: 'O valor informado no campo %s é inválido',
        quantidadeInvalida: 'O CPF deve possuir 11 caracteres.'
    };

    constructor() {
        super({
            nome: new FormControl(null, [Validators.required]),
            cpf: new FormControl(null, [
                Validators.required,
                PessoaForm.validaQuantidaDeDigito(11),
                PessoaForm.validaCpf()
            ]),
            tipoDocumento: new FormControl(null),
            carteiraIdentidade: new FormControl(null, [Validators.required]),
            orgaoEmissor: new FormControl(null, [Validators.required]),
            ufOrgaoEmissor: new FormControl(null, [Validators.required]),
            dataDeNascimento: new FormControl(null, [Validators.required]),
            isBrasileiro: new FormControl(null, [Validators.required]),
            nacionalidade: new FormControl(null, [Validators.required]),
            ufNaturalidade: new FormControl(null, [Validators.required]),
            naturalidadeEstrangeira: new FormControl(null),
            naturalidade: new FormControl(null, [Validators.required]),
            estadoCivil: new FormControl(null, [Validators.required]),
            nomeDaMae: new FormControl(null, [Validators.required]),
            nomeDoPai: new FormControl(null),
            sexo: new FormControl(null, [Validators.required])
        });
    }

    private static validaQuantidaDeDigito(quantidade: number): ValidatorFn {
        return (control: AbstractControl): Record<string, true> => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,  @typescript-eslint/no-unsafe-call
            const conteudo = control.value ? control.value.replace(regexClearCpfCnpj, '') : '';

            if (conteudo.length > 0 && conteudo.length < quantidade) {
                return { quantidadeInvalida: true };
            }
        };
    }

    private static validaCpf(): ValidatorFn {
        return (control: AbstractControl): any => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const cpf = control.value ? control.value : '';
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            if (!isValidCpf(cpf) && cpf.replace(regexClearCpfCnpj, '').length) {
                return { valorInvalido: true };
            }
        };
    }

    public get cpf(): AbstractControl {
        return this.get('cpf');
    }

    public get nome(): AbstractControl {
        return this.get('nome');
    }

    public get tipoDocumento(): AbstractControl {
        return this.get('tipoDocumento');
    }

    public get nacionalidade(): AbstractControl {
        return this.get('nacionalidade');
    }

    public get isBrasileiro(): AbstractControl {
        return this.get('isBrasileiro');
    }

    public get ufNaturalidade(): AbstractControl {
        return this.get('ufNaturalidade');
    }

    public get estadoCivil(): AbstractControl {
        return this.get('estadoCivil');
    }

    public get dataDeNascimento(): AbstractControl {
        return this.get('dataDeNascimento');
    }

    public get sexo(): AbstractControl {
        return this.get('sexo');
    }

    public get nomeDaMae(): AbstractControl {
        return this.get('nomeDaMae');
    }

    public get nomeDoPai(): AbstractControl {
        return this.get('nomeDoPai');
    }

    public get carteiraIdentidade(): AbstractControl {
        return this.get('carteiraIdentidade');
    }

    public get orgaoEmissor(): AbstractControl {
        return this.get('orgaoEmissor');
    }

    public get ufOrgaoEmissor(): AbstractControl {
        return this.get('ufOrgaoEmissor');
    }

    public get naturalidade(): AbstractControl {
        return this.get('naturalidade');
    }

    public get naturalidadeEstrangeira(): AbstractControl {
        return this.get('naturalidadeEstrangeira');
    }

    public getFirstErrorFrom(controlName: string, label: string): string {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        return this._errorMessages[Object.keys(this.get(controlName).errors)[0]].replace('%s', label || controlName);
    }

    public getDadosForm(): any {
        this.deleteControlValuesNull();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.value;
    }

    public markAllAsTouched(): void {
        Object.keys(this.controls).map((control) => this.get(control).markAsDirty());
    }

    private deleteControlValuesNull(): void {
        for (const control in this.value) {
            if (this.value[control] === null || this.value[control] === '') {
                delete this.value[control];
            }
        }
    }

    public setValues(data: PessoaInterface): void {
        this.nome.setValue(data.nome);
        this.cpf.setValue(data.cpf);
        this.tipoDocumento.setValue(data.tipo_documento);
        this.carteiraIdentidade.setValue(data.documento);
        this.orgaoEmissor.setValue(data.orgao_emissor);
        this.ufOrgaoEmissor.setValue(data.uf_orgao_emissor);
        this.dataDeNascimento.setValue(
            data.data_nascimento ? new Date(data.data_nascimento).toLocaleDateString('fr-CA') : null
        );
        this.isBrasileiro.setValue(data.is_brasileiro);
        this.nacionalidade.setValue(data.nacionalidade);
        this.naturalidadeEstrangeira.setValue(data.naturalidade_estrangeira);
        this.ufNaturalidade.setValue(data.uf_naturalidade);
        this.naturalidade.setValue(data.naturalidade);
        this.estadoCivil.setValue(data.estado_civil);
        this.nomeDaMae.setValue(data.nome_mae);
        this.nomeDoPai.setValue(data.nome_pai);
        this.sexo.setValue(data.sexo);
    }

    public getDadosEnvioPessoa(): PessoaInterface {
        const pessoa = new Pessoa(this.value);
        return {
            nome: pessoa.nome,
            cpf: clearMask(pessoa.cpf),
            tipo_documento: pessoa.tipo_documento,
            documento: pessoa.documento,
            orgao_emissor: pessoa.orgao_emissor,
            uf_orgao_emissor: pessoa.uf_orgao_emissor,
            data_nascimento: pessoa.data_nascimento
                ? new Date(pessoa.data_nascimento).toLocaleDateString('fr-CA')
                : null,
            is_brasileiro: pessoa.is_brasileiro,
            nacionalidade: pessoa.nacionalidade,
            naturalidade_estrangeira: pessoa.naturalidade_estrangeira,
            uf_naturalidade: pessoa.uf_naturalidade,
            naturalidade: pessoa.naturalidade,
            estado_civil: pessoa.estado_civil,
            nome_mae: pessoa.nome_mae,
            nome_pai: pessoa.nome_pai,
            sexo: pessoa.sexo
        };
    }
}
