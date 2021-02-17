import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ContabilistaInterface } from 'src/app/core/interfaces/pessoa-fisica/dados-inscricao.interface';

export class ContabilistaForm extends FormGroup {
    private _errorMessages = {
        required: 'O campo %s é obrigatório.',
        email: 'Este e-mail não é válido.'
    };

    constructor() {
        super({
            tipo_pessoa: new FormControl(null),
            co_cpf: new FormControl(null, [Validators.required]),
            ds_nome: new FormControl(null, [Validators.required]),
            nu_tipo_crc: new FormControl(null),
            ds_classificacao: new FormControl(null, [Validators.required]),
            co_tipo_classificacao_crc: new FormControl(null, [Validators.required]),
            co_digito_verificador: new FormControl(null, [Validators.required]),
            co_uf_crc: new FormControl(null, [Validators.required]),
            nu_sequencia: new FormControl(null, [Validators.required]),
            co_cnpj: new FormControl(null, [Validators.required]),
            ds_nome_empresa: new FormControl(null, [Validators.required]),
            nu_tipo_crc_empresa: new FormControl(null, [Validators.required]),
            ds_classificacao_empresa: new FormControl(null, [Validators.required]),
            co_tipo_classificacao_crc_empresa: new FormControl(null, [Validators.required]),
            co_digito_verificador_empresa: new FormControl(null, [Validators.required]),
            dt_registro: new FormControl(null),
            co_uf_crc_empresa: new FormControl(null, [Validators.required]),
            co_uf: new FormControl(null, [Validators.required]),
            ds_municipio: new FormControl(null, [Validators.required]),
            ds_endereco: new FormControl(null, [Validators.required]),
            co_cep: new FormControl(null, [Validators.required]),
            nu_numero: new FormControl(null, [Validators.required]),
            ds_complemento: new FormControl(null, [Validators.required]),
            ds_bairro: new FormControl(null, [Validators.required]),
            nu_telefone: new FormControl(null),
            co_fax: new FormControl(null),
            ds_email: new FormControl(null, [Validators.email])
        });
    }

    public get tipo_pessoa(): AbstractControl {
        return this.get('tipo_pessoa');
    }

    public get co_cnpj(): AbstractControl {
        return this.get('co_cnpj');
    }

    public get co_cpf(): AbstractControl {
        return this.get('co_cpf');
    }

    public get ds_nome(): AbstractControl {
        return this.get('ds_nome');
    }

    public get ds_nome_empresa(): AbstractControl {
        return this.get('ds_nome_empresa');
    }

    public get nu_tipo_crc(): AbstractControl {
        return this.get('nu_tipo_crc');
    }

    public get ds_classificacao(): AbstractControl {
        return this.get('ds_classificacao');
    }

    public get co_tipo_classificacao_crc(): AbstractControl {
        return this.get('co_tipo_classificacao_crc');
    }

    public get co_digito_verificador(): AbstractControl {
        return this.get('co_digito_verificador');
    }

    public get dt_registro(): AbstractControl {
        return this.get('dt_registro');
    }

    public get nu_sequencia(): AbstractControl {
        return this.get('nu_sequencia');
    }

    public get co_uf_crc(): AbstractControl {
        return this.get('co_uf_crc');
    }

    public get co_uf(): AbstractControl {
        return this.get('co_uf');
    }

    public get nu_tipo_crc_empresa(): AbstractControl {
        return this.get('nu_tipo_crc_empresa');
    }

    public get co_tipo_classificacao_crc_empresa(): AbstractControl {
        return this.get('co_tipo_classificacao_crc_empresa');
    }

    public get co_digito_verificador_empresa(): AbstractControl {
        return this.get('co_digito_verificador_empresa');
    }

    public get ds_classificacao_empresa(): AbstractControl {
        return this.get('ds_classificacao_empresa');
    }

    public get co_uf_crc_empresa(): AbstractControl {
        return this.get('co_uf_crc_empresa');
    }

    public get ds_municipio(): AbstractControl {
        return this.get('ds_municipio');
    }

    public get ds_endereco(): AbstractControl {
        return this.get('ds_endereco');
    }

    public get co_cep(): AbstractControl {
        return this.get('co_cep');
    }

    public get nu_numero(): AbstractControl {
        return this.get('nu_numero');
    }

    public get ds_complemento(): AbstractControl {
        return this.get('ds_complemento');
    }

    public get ds_bairro(): AbstractControl {
        return this.get('ds_bairro');
    }

    public get nu_telefone(): AbstractControl {
        return this.get('nu_telefone');
    }

    public get co_fax(): AbstractControl {
        return this.get('co_fax');
    }

    public get ds_email(): AbstractControl {
        return this.get('ds_email');
    }

    public getFirstErrorFrom(controlName: string, label: string): string {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        return this._errorMessages[Object.keys(this.get(controlName).errors)[0]].replace('%s', label || controlName);
    }

    public setValues(contabilista: ContabilistaInterface): void {
        if (contabilista) {
            this.co_cpf.setValue(contabilista.responsavel.nu_cpf);
            this.co_cnpj.setValue(contabilista.co_cpf_cnpj);
            this.ds_nome.setValue(contabilista.responsavel.ds_nome);
            this.ds_nome_empresa.setValue(contabilista.ds_nome);
            this.nu_tipo_crc.setValue(contabilista.responsavel.conselho.nu_tipo_crc);
            this.nu_tipo_crc_empresa.setValue(contabilista.conselho.nu_tipo_crc);
            this.dt_registro.setValue(Date.toString());
            this.nu_sequencia.setValue(contabilista.conselho.nu_sequencia);
            this.co_tipo_classificacao_crc.setValue(contabilista.responsavel.conselho.co_tipo_classificacao_crc);
            this.co_tipo_classificacao_crc_empresa.setValue(contabilista.conselho.co_tipo_classificacao_crc);
            this.co_digito_verificador.setValue(contabilista.responsavel.conselho.co_digito_verificador);
            this.co_digito_verificador_empresa.setValue(contabilista.conselho.co_digito_verificador);
            this.co_uf_crc.setValue(contabilista.responsavel.conselho.co_uf_crc);
            this.co_uf_crc_empresa.setValue(contabilista.conselho.co_uf_crc);
            this.co_uf.setValue(contabilista.endereco.co_uf);
            this.ds_endereco.setValue(contabilista.endereco.ds_endereco);
            this.ds_municipio.setValue(contabilista.endereco.co_municipio);
            this.co_cep.setValue(contabilista.endereco.co_cep);
            this.nu_numero.setValue(contabilista.responsavel.nu_cpf);
            this.ds_complemento.setValue(contabilista.endereco.ds_complemento);
            this.ds_bairro.setValue(contabilista.endereco.ds_bairro);
            return;
        }

        return;
    }
}
