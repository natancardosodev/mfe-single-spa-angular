import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { FormFieldProdutor } from '@core/enums/visualizar-processo/form-produtor.enum';
import { formatDateEnToBr } from '@core/utils/date.util';
import { DadosInscricaoInterface } from '@core/interfaces/visualizar-processo/dados-inscricao.interface';

export class ProdutorForm extends FormGroup {
    private _errorMessages = {
        required: 'O campo %s é obrigatório.',
        email: 'Este e-mail não é válido.',
        bsDate: 'A data informada é inválida.'
    };

    constructor() {
        super({
            [FormFieldProdutor.protocolo]: new FormControl(null, [Validators.required]),
            [FormFieldProdutor.no_cpf]: new FormControl(null, [Validators.required]),
            [FormFieldProdutor.ds_nome]: new FormControl(null, [Validators.required]),
            [FormFieldProdutor.dt_solicitacao]: new FormControl(null, [Validators.required]),
            [FormFieldProdutor.co_evento]: new FormControl(null, [Validators.required]),
            [FormFieldProdutor.nu_documento]: new FormControl(null, [Validators.required]),
            [FormFieldProdutor.ds_orgao_emissor]: new FormControl(null, [Validators.required]),
            [FormFieldProdutor.co_uf_emissor]: new FormControl(null),
            [FormFieldProdutor.co_sexo]: new FormControl(null, [Validators.required]),
            [FormFieldProdutor.nacionalidade]: new FormControl(null),
            [FormFieldProdutor.estado_civil]: new FormControl(null),
            [FormFieldProdutor.dt_nascimento]: new FormControl(null),
            [FormFieldProdutor.naturalidade]: new FormControl(null),
            [FormFieldProdutor.uf_naturalidade]: new FormControl(null),
            [FormFieldProdutor.uf_pais]: new FormControl(null, [Validators.required]),
            [FormFieldProdutor.co_municipio]: new FormControl(null, [Validators.required]),
            [FormFieldProdutor.co_cep]: new FormControl(null, [Validators.required]),
            [FormFieldProdutor.ds_endereco]: new FormControl(null, [Validators.required]),
            [FormFieldProdutor.nu_numero]: new FormControl(null, [Validators.required]),
            [FormFieldProdutor.ds_complemento]: new FormControl(null),
            [FormFieldProdutor.ds_bairro]: new FormControl(null, [Validators.required]),
            [FormFieldProdutor.nu_telefone]: new FormControl(null),
            [FormFieldProdutor.co_fax]: new FormControl(null),
            [FormFieldProdutor.ds_email]: new FormControl(null, [Validators.email])
        });
    }

    public get protocolo(): AbstractControl {
        return this.get([FormFieldProdutor.protocolo]);
    }

    public get no_cpf(): AbstractControl {
        return this.get([FormFieldProdutor.no_cpf]);
    }

    public get ds_nome(): AbstractControl {
        return this.get([FormFieldProdutor.ds_nome]);
    }

    public get dt_solicitacao(): AbstractControl {
        return this.get([FormFieldProdutor.dt_solicitacao]);
    }

    public get co_evento(): AbstractControl {
        return this.get([FormFieldProdutor.co_evento]);
    }

    public get nu_documento(): AbstractControl {
        return this.get([FormFieldProdutor.nu_documento]);
    }

    public get ds_orgao_emissor(): AbstractControl {
        return this.get([FormFieldProdutor.ds_orgao_emissor]);
    }

    public get co_uf_emissor(): AbstractControl {
        return this.get([FormFieldProdutor.co_uf_emissor]);
    }

    public get co_sexo(): AbstractControl {
        return this.get([FormFieldProdutor.co_sexo]);
    }

    public get nacionalidade(): AbstractControl {
        return this.get([FormFieldProdutor.nacionalidade]);
    }

    public get estado_civil(): AbstractControl {
        return this.get([FormFieldProdutor.estado_civil]);
    }

    public get dt_nascimento(): AbstractControl {
        return this.get([FormFieldProdutor.dt_nascimento]);
    }

    public get naturalidade(): AbstractControl {
        return this.get([FormFieldProdutor.naturalidade]);
    }

    public get uf_naturalidade(): AbstractControl {
        return this.get([FormFieldProdutor.uf_naturalidade]);
    }

    public get uf_pais(): AbstractControl {
        return this.get([FormFieldProdutor.uf_pais]);
    }

    public get co_municipio(): AbstractControl {
        return this.get([FormFieldProdutor.co_municipio]);
    }

    public get co_cep(): AbstractControl {
        return this.get([FormFieldProdutor.co_cep]);
    }

    public get ds_endereco(): AbstractControl {
        return this.get([FormFieldProdutor.ds_endereco]);
    }

    public get nu_numero(): AbstractControl {
        return this.get([FormFieldProdutor.nu_numero]);
    }

    public get ds_complemento(): AbstractControl {
        return this.get([FormFieldProdutor.ds_complemento]);
    }

    public get ds_bairro(): AbstractControl {
        return this.get([FormFieldProdutor.ds_bairro]);
    }

    public get nu_telefone(): AbstractControl {
        return this.get([FormFieldProdutor.nu_telefone]);
    }

    public get ds_email(): AbstractControl {
        return this.get([FormFieldProdutor.ds_email]);
    }

    public get co_fax(): AbstractControl {
        return this.get([FormFieldProdutor.co_fax]);
    }

    public getFirstErrorFrom(controlName: string, label: string): string {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        return this._errorMessages[Object.keys(this.get(controlName).errors)[0]].replace('%s', label || controlName);
    }

    public markAllAsTouched(): void {
        Object.keys(this.controls).map((control) => this.get(control).markAsDirty());
    }

    public updateAll(): void {
        Object.keys(this.controls).map((control) => this.get(control).updateValueAndValidity());
    }

    public getDados(): DadosInscricaoInterface {
        const form = this.value;

        return {
            protocolo: form.protocolo,
            no_cpf: form.no_cpf,
            nu_seq_solicitacao: form.nu_seq_solicitacao,
            ds_nome: form.ds_nome,
            co_sexo: form.co_sexo,
            co_tipo_documento: form.co_tipo_documento,
            nu_documento: form.nu_documento,
            ds_orgao_emissor: form.ds_orgao_emissor,
            co_uf_emissor: form.co_uf_emissor,
            ds_escolaridade: form.ds_escolaridade,
            data_nascimento: form.data_nascimento
        };
    }

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
        this.dt_nascimento.setValue(formatDateEnToBr(produtor.data_nascimento));

        if (produtor.imovel.endereco_correspondencia) {
            this.co_municipio.setValue(produtor.imovel.endereco_correspondencia.co_municipio);
            this.co_cep.setValue(produtor.imovel.endereco_correspondencia.co_cep);
            this.ds_endereco.setValue(produtor.imovel.endereco_correspondencia.co_tipo_logradouro);
            this.nu_numero.setValue(produtor.imovel.endereco_correspondencia.nu_numero);
            this.ds_complemento.setValue(produtor.imovel.endereco_correspondencia.ds_complemento);
            this.ds_bairro.setValue(produtor.imovel.endereco_correspondencia.ds_bairro);
            this.nu_telefone.setValue(produtor.imovel.endereco_correspondencia.co_telefone);
            this.ds_email.setValue(produtor.imovel.endereco_correspondencia.ds_email);
            this.co_fax.setValue(null);
        }
    }
}
