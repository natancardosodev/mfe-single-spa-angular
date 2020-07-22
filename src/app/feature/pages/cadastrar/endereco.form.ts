import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Endereco } from 'src/app/core/models/endereco';
import { EnderecoInterface } from 'src/app/core/interfaces/endereco.interface';

export class EnderecoForm extends FormGroup {
    private _errorMessages = {
        required: 'O campo %s é obrigatório.',
        email: 'O Email informado é inválido',
        valorInvalido: 'O valor informado no campo %s é inválido',
        quantidadeInvalida: 'O CPF deve possuir 11 caracteres.'
    };

    constructor() {
        super({
            cep: new FormControl(null, [Validators.required]),
            tipoLogradouro: new FormControl(null, [Validators.required]),
            logradouro: new FormControl(null, [Validators.required]),
            numero: new FormControl(null, [Validators.required]),
            bairro: new FormControl(null, [Validators.required]),
            complemento: new FormControl(null),
            municipio: new FormControl(null, [Validators.required]),
            uf: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            dddCelular: new FormControl(null, [Validators.required]),
            celular: new FormControl(null, [Validators.required]),
            telefone: new FormControl(null),
            dddTelefone: new FormControl(null)
        });
    }

    public get cep(): AbstractControl {
        return this.get('cep');
    }

    public get tipoLogradouro(): AbstractControl {
        return this.get('tipoLogradouro');
    }

    public get logradouro(): AbstractControl {
        return this.get('logradouro');
    }

    public get bairro(): AbstractControl {
        return this.get('bairro');
    }

    public get numero(): AbstractControl {
        return this.get('numero');
    }

    public get complemento(): AbstractControl {
        return this.get('complemento');
    }

    public get uf(): AbstractControl {
        return this.get('uf');
    }

    public get municipio(): AbstractControl {
        return this.get('municipio');
    }

    public get dddCelular(): AbstractControl {
        return this.get('dddCelular');
    }

    public get celular(): AbstractControl {
        return this.get('celular');
    }

    public get dddTelefone(): AbstractControl {
        return this.get('dddTelefone');
    }

    public get telefone(): AbstractControl {
        return this.get('telefone');
    }

    public get email(): AbstractControl {
        return this.get('email');
    }

    public markAllAsTouched(): void {
        Object.keys(this.controls).map((control) => this.get(control).markAsDirty());
    }

    public getFirstErrorFrom(controlName: string, label: string): string {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        return this._errorMessages[Object.keys(this.get(controlName).errors)[0]].replace('%s', label || controlName);
    }

    public getDadosEnvioEndereco(): EnderecoInterface {
        const endereco: Endereco = new Endereco(this.value);
        return endereco.getValues();
    }

    public setValues(data: EnderecoInterface): void {
        this.cep.setValue(data.cep);
        this.tipoLogradouro.setValue(data.tipo_logradouro);
        this.logradouro.setValue(data.logradouro);
        this.numero.setValue(data.numero);
        this.bairro.setValue(data.bairro);
        this.complemento.setValue(data.complemento);
        this.municipio.setValue(data.municipio);
        this.uf.setValue(data.uf);
        this.email.setValue(data.email);
        this.dddCelular.setValue(data.ddd_celular);
        this.celular.setValue(data.celular);
        this.dddTelefone.setValue(data.ddd_telefone);
        this.telefone.setValue(data.telefone);
    }
}
