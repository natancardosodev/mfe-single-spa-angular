import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { DadosInscricaoInterface } from 'src/app/core/interfaces/pessoa-fisica/dados-inscricao.interface';

export class ProdutorForm extends FormGroup {
    private _errorMessages = {
        required: 'O campo %s é obrigatório.',
        email: 'Este e-mail não é válido.'
    };

    constructor() {
        super({
            protocolo: new FormControl(null, [Validators.required]),
            no_cpf: new FormControl(null, [Validators.required]),
            ds_nome: new FormControl(null, [Validators.required]),
            dt_solicitacao: new FormControl(null, [Validators.required]),
            co_evento: new FormControl(null, [Validators.required]),
            nu_documento: new FormControl(null, [Validators.required]),
            ds_orgao_emissor: new FormControl(null, [Validators.required]),
            co_uf_emissor: new FormControl(null),
            co_sexo: new FormControl(null, [Validators.required]),
            nacionalidade: new FormControl(null, [Validators.required]),
            estado_civil: new FormControl(null),
            dt_nascimento: new FormControl(null),
            naturalidade: new FormControl(null),
            uf_naturalidade: new FormControl(null),
            uf_pais: new FormControl(null, [Validators.required]),
            ds_municipio: new FormControl(null, [Validators.required]),
            co_cep: new FormControl(null, [Validators.required]),
            ds_endereco: new FormControl(null, [Validators.required]),
            nu_numero: new FormControl(null, [Validators.required]),
            ds_complemento: new FormControl(null),
            ds_bairro: new FormControl(null, [Validators.required]),
            nu_telefone: new FormControl(null),
            co_fax: new FormControl(null),
            ds_email: new FormControl(null, [Validators.email])
        });
    }

    public get protocolo(): AbstractControl {
        return this.get('protocolo');
    }

    public get no_cpf(): AbstractControl {
        return this.get('no_cpf');
    }

    public get ds_nome(): AbstractControl {
        return this.get('ds_nome');
    }

    public get dt_solicitacao(): AbstractControl {
        return this.get('dt_solicitacao');
    }

    public get co_evento(): AbstractControl {
        return this.get('co_evento');
    }

    public get nu_documento(): AbstractControl {
        return this.get('nu_documento');
    }

    public get ds_orgao_emissor(): AbstractControl {
        return this.get('ds_orgao_emissor');
    }

    public get co_uf_emissor(): AbstractControl {
        return this.get('co_uf_emissor');
    }

    public get co_sexo(): AbstractControl {
        return this.get('co_sexo');
    }

    public get nacionalidade(): AbstractControl {
        return this.get('nacionalidade');
    }

    public get estado_civil(): AbstractControl {
        return this.get('estado_civil');
    }

    public get dt_nascimento(): AbstractControl {
        return this.get('dt_nascimento');
    }

    public get naturalidade(): AbstractControl {
        return this.get('naturalidade');
    }

    public get uf_naturalidade(): AbstractControl {
        return this.get('uf_naturalidade');
    }

    public get uf_pais(): AbstractControl {
        return this.get('uf_pais');
    }

    public get ds_municipio(): AbstractControl {
        return this.get('ds_municipio');
    }

    public get co_cep(): AbstractControl {
        return this.get('co_cep');
    }

    public get ds_endereco(): AbstractControl {
        return this.get('ds_endereco');
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

    public get ds_email(): AbstractControl {
        return this.get('ds_email');
    }

    public get co_fax(): AbstractControl {
        return this.get('co_fax');
    }

    public getFirstErrorFrom(controlName: string, label: string): string {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        return this._errorMessages[Object.keys(this.get(controlName).errors)[0]].replace('%s', label || controlName);
    }

    // @todo ver campos comentados
    public setValues(produtor: DadosInscricaoInterface): void {
        this.protocolo.setValue(produtor.protocolo);
        this.no_cpf.setValue(produtor.no_cpf);
        this.ds_nome.setValue(produtor.ds_nome);
        this.dt_solicitacao.setValue(new Date(produtor.andamento[0]['data']).toLocaleDateString('pt-br'));
        this.co_evento.setValue(produtor.dados_evento[0].co_evento);
        this.nu_documento.setValue(produtor.nu_documento);
        this.ds_orgao_emissor.setValue(produtor.ds_orgao_emissor);
        this.co_uf_emissor.setValue(produtor.co_uf_emissor);
        this.co_sexo.setValue(produtor.co_sexo);
        this.nacionalidade.setValue(null);
        this.dt_nascimento.setValue(new Date(produtor.data_nascimento).toLocaleDateString('pt-br'));
        this.ds_municipio.setValue(produtor.imovel.endereco.co_municipio);
        this.co_cep.setValue(produtor.imovel.endereco.co_cep);
        this.ds_endereco.setValue(produtor.imovel.endereco.co_tipo_logradouro);
        this.nu_numero.setValue(produtor.imovel.endereco.nu_numero);
        this.ds_complemento.setValue(produtor.imovel.endereco.ds_complemento);
        this.ds_bairro.setValue(produtor.imovel.endereco.ds_bairro);
        this.nu_telefone.setValue(produtor.imovel.endereco.nu_telefone);
        this.ds_email.setValue(produtor.imovel.endereco.ds_email);
        this.co_fax.setValue(null);
    }

    public markAllAsTouched(): void {
        Object.keys(this.controls).map((control) => this.get(control).markAsDirty());
    }

    public updateAll(): void {
        Object.keys(this.controls).map((control) => this.get(control).updateValueAndValidity());
    }
}
