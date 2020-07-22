import { EnderecoInterface } from '../interfaces/endereco.interface';
import { clearMask } from '../configs/regexClearMask';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class Endereco {
    private _cep?: string;
    private _tipo_logradouro?: number;
    private _logradouro?: string;
    private _numero?: number;
    private _bairro?: string;
    private _complemento?: string;
    private _municipio?: number;
    private _uf?: number;
    private _email?: string;
    private _ddd_telefone?: string;
    private _telefone?: string;
    private _ddd_celular?: string;
    private _celular?: string;

    constructor({
        cep = null,
        tipoLogradouro = null,
        logradouro = null,
        numero = null,
        bairro = null,
        complemento = null,
        municipio = null,
        uf = null,
        email = null,
        dddCelular = null,
        celular = null,
        dddTelefone = null,
        telefone = null
    }) {
        this.cep = cep;
        this.tipo_logradouro = tipoLogradouro;
        this.logradouro = logradouro;
        this.numero = numero;
        this.bairro = bairro;
        this.complemento = complemento;
        this.municipio = municipio;
        this.uf = uf;
        this.email = email;
        this.ddd_celular = dddCelular;
        this.celular = celular;
        this.ddd_telefone = dddTelefone;
        this.telefone = telefone;
    }

    public getValues(): EnderecoInterface {
        return {
            cep: clearMask(this.cep),
            tipo_logradouro: this.tipo_logradouro,
            logradouro: this.logradouro,
            numero: this.numero,
            bairro: this.bairro,
            complemento: this.complemento,
            municipio: this.municipio,
            uf: this.uf,
            email: this.email,
            ddd_telefone: this.ddd_telefone,
            telefone: clearMask(this.telefone),
            ddd_celular: this.ddd_celular,
            celular: clearMask(this.celular)
        };
    }

    get cep(): string {
        return this._cep;
    }

    set cep(value: string) {
        this._cep = value;
    }

    get tipo_logradouro(): number {
        return this._tipo_logradouro;
    }

    set tipo_logradouro(value: number) {
        this._tipo_logradouro = value;
    }

    get logradouro(): string {
        return this._logradouro;
    }

    set logradouro(value: string) {
        this._logradouro = value;
    }

    get numero(): number {
        return this._numero;
    }

    set numero(value: number) {
        this._numero = value;
    }

    get bairro(): string {
        return this._bairro;
    }

    set bairro(value: string) {
        this._bairro = value;
    }

    get complemento(): string {
        return this._complemento;
    }

    set complemento(value: string) {
        this._complemento = value;
    }

    get municipio(): number {
        return this._municipio;
    }

    set municipio(value: number) {
        this._municipio = value;
    }

    get uf(): number {
        return this._uf;
    }

    set uf(value: number) {
        this._uf = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get ddd_telefone(): string {
        return this._ddd_telefone;
    }

    set ddd_telefone(value: string) {
        this._ddd_telefone = value;
    }

    get telefone(): string {
        return this._telefone;
    }

    set telefone(value: string) {
        this._telefone = value;
    }

    get ddd_celular(): string {
        return this._ddd_celular;
    }

    set ddd_celular(value: string) {
        this._ddd_celular = value;
    }

    get celular(): string {
        return this._celular;
    }

    set celular(value: string) {
        this._celular = value;
    }
}
