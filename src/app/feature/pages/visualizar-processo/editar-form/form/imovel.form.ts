/* eslint-disable @typescript-eslint/no-unsafe-call */
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { MensagensEnum } from '@core/enums/mensagens.enum';
import { ImovelInterface } from '@core/interfaces/pessoa-fisica/dados-inscricao.interface';

export class ImovelForm extends FormGroup {
    private _errorMessages = {
        required: 'O campo %s é obrigatório.',
        bsDate: MensagensEnum.DATA_INVALIDA
    };

    constructor() {
        super({
            co_tipo_logradouro: new FormControl(null, [Validators.required]),
            ds_endereco: new FormControl(null, [Validators.required]),
            nu_numero_imovel: new FormControl(null, [Validators.required]),
            ds_bairro_imovel: new FormControl(null, [Validators.required]),
            uf_imovel: new FormControl(null, [Validators.required]),
            co_municipio: new FormControl(null, [Validators.required]),
            co_cep_imovel: new FormControl(null, [Validators.required]),
            co_tipo_imovel: new FormControl(null),
            nu_area_total: new FormControl(null, [Validators.required]),
            nu_area_producao: new FormControl(null, [Validators.required]),
            ds_ponto_referencia: new FormControl(null),
            nu_latitude: new FormControl(null),
            nu_longitude: new FormControl(null),
            nu_inscricao_rural: new FormControl(null),
            nu_car: new FormControl(null),
            nu_ccir: new FormControl(null),
            nu_sigef: new FormControl(null)
        });
    }

    public get co_tipo_logradouro(): AbstractControl {
        return this.get('co_tipo_logradouro');
    }

    public get ds_endereco(): AbstractControl {
        return this.get('ds_endereco');
    }

    public get nu_numero_imovel(): AbstractControl {
        return this.get('nu_numero_imovel');
    }

    public get ds_bairro_imovel(): AbstractControl {
        return this.get('ds_bairro_imovel');
    }

    public get uf_imovel(): AbstractControl {
        return this.get('uf_imovel');
    }

    public get co_municipio(): AbstractControl {
        return this.get('co_municipio');
    }

    public get co_cep_imovel(): AbstractControl {
        return this.get('co_cep_imovel');
    }

    public get co_tipo_imovel(): AbstractControl {
        return this.get('co_tipo_imovel');
    }

    public get nu_area_total(): AbstractControl {
        return this.get('nu_area_total');
    }

    public get nu_area_producao(): AbstractControl {
        return this.get('nu_area_producao');
    }

    public get ds_ponto_referencia(): AbstractControl {
        return this.get('ds_ponto_referencia');
    }

    public get nu_inscricao_rural(): AbstractControl {
        return this.get('nu_inscricao_rural');
    }

    public get nu_latitude(): AbstractControl {
        return this.get('nu_latitude');
    }

    public get nu_longitude(): AbstractControl {
        return this.get('nu_longitude');
    }

    public get nu_car(): AbstractControl {
        return this.get('nu_car');
    }

    public get nu_ccir(): AbstractControl {
        return this.get('nu_ccir');
    }

    public get nu_sigef(): AbstractControl {
        return this.get('nu_sigef');
    }

    public getFirstErrorFrom(controlName: string, label: string): string {
        return this._errorMessages[Object.keys(this.get(controlName).errors)[0]].replace('%s', label || controlName);
    }

    public markAllAsTouched(): void {
        Object.keys(this.controls).map((control) => this.get(control).markAsDirty());
    }

    public updateAll(): void {
        Object.keys(this.controls).map((control) => this.get(control).updateValueAndValidity());
    }

    public getDados(): Record<string, string> {
        const form = this.value;

        return {
            // @todo completar form
            co_tipo_logradouro: form.endereco.co_tipo_logradouro,
            ds_endereco: form.endereco.ds_endereco
        };
    }

    public setValues(produtor: ImovelInterface): void {
        this.co_tipo_logradouro.setValue(produtor.endereco.co_tipo_logradouro);
        this.ds_endereco.setValue(produtor.endereco.ds_endereco);
        this.nu_numero_imovel.setValue(produtor.nu_inscricao_rural);
        this.ds_bairro_imovel.setValue(produtor.endereco.ds_bairro);
        this.uf_imovel.setValue(produtor.endereco.co_uf);
        this.co_municipio.setValue(produtor.endereco.co_municipio);
        this.co_cep_imovel.setValue(produtor.endereco.co_cep);
        this.co_tipo_imovel.setValue(produtor.endereco.co_tipo_imovel);
        this.ds_ponto_referencia.setValue(produtor.endereco.ds_ponto_referencia);
        this.nu_area_total.setValue(produtor.endereco.nu_area_total);
        this.nu_area_producao.setValue(produtor.endereco.nu_area_producao);
        this.nu_latitude.setValue(produtor.endereco.coordenadas_geograficas.latitude);
        this.nu_longitude.setValue(produtor.endereco.coordenadas_geograficas.longitude);
        this.nu_inscricao_rural.setValue(produtor.nu_inscricao_rural);
        this.nu_car.setValue(produtor.nu_car);
        this.nu_ccir.setValue(produtor.nu_ccir);
        this.nu_sigef.setValue(produtor.nu_sigef);
    }
}
