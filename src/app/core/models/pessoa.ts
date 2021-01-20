import { clearMask } from '../configs/regexClearMask';

export class Pessoa {
    private _cpf: string;
    private _nome: string;
    private _tipo_documento: number;
    private _documento: string;
    private _orgao_emissor: string;
    private _uf_orgao_emissor: string;
    private _data_nascimento: string;
    private _is_brasileiro: boolean;
    private _nacionalidade: number;
    private _uf_naturalidade: number;
    private _naturalidade_estrangeira: string;
    private _naturalidade: number;
    private _estado_civil: number;
    private _nome_mae: string;
    private _nome_pai: string;
    private _sexo: string;

    constructor({
        cpf = null,
        nome = null,
        carteiraIdentidade = null,
        orgaoEmissor = null,
        ufOrgaoEmissor = null,
        dataDeNascimento = null,
        isBrasileiro = null,
        nacionalidade = null,
        ufNaturalidade = null,
        naturalidade = null,
        naturalidadeEstrangeira = null,
        estadoCivil = null,
        nomeDaMae = null,
        nomeDoPai = null,
        sexo = null
    }) {
        this.cpf = cpf;
        this.nome = nome;
        this.tipo_documento = 1;
        this.documento = carteiraIdentidade;
        this.orgao_emissor = orgaoEmissor;
        this.uf_orgao_emissor = ufOrgaoEmissor;
        this.data_nascimento = dataDeNascimento;
        this.is_brasileiro = isBrasileiro;
        this.nacionalidade = nacionalidade;
        this.uf_naturalidade = ufNaturalidade;
        this.naturalidade = naturalidade;
        this.naturalidade_estrangeira = naturalidadeEstrangeira;
        this.estado_civil = estadoCivil;
        this.nome_mae = nomeDaMae;
        this.nome_pai = nomeDoPai;
        this.sexo = sexo;
    }

    public getValues(): any {
        return {
            nome: this.nome,
            cpf: clearMask(this.cpf),
            tipo_documento: this.tipo_documento,
            documento: this.documento,
            orgao_emissor: this.orgao_emissor,
            uf_orgao_emissor: this.uf_orgao_emissor,
            data_nascimento: this.data_nascimento,
            is_brasileiro: this.is_brasileiro,
            nacionalidade: this.nacionalidade,
            naturalidade_estrangeira: !this.is_brasileiro ? this.naturalidade_estrangeira : null,
            uf_naturalidade: this.is_brasileiro ? this.uf_naturalidade : null,
            naturalidade: this.naturalidade,
            estado_civil: this.estado_civil,
            nome_mae: this.nome_mae,
            nome_pai: this.nome_pai,
            sexo: this.sexo
        };
    }

    get cpf(): string {
        return this._cpf;
    }

    set cpf(value: string) {
        this._cpf = value;
    }

    get nome(): string {
        return this._nome;
    }

    set nome(value: string) {
        this._nome = value;
    }

    get tipo_documento(): number {
        return this._tipo_documento;
    }

    set tipo_documento(value: number) {
        this._tipo_documento = value;
    }

    get documento(): string {
        return this._documento;
    }

    set documento(value: string) {
        this._documento = value;
    }

    get orgao_emissor(): string {
        return this._orgao_emissor;
    }

    set orgao_emissor(value: string) {
        this._orgao_emissor = value;
    }

    get uf_orgao_emissor(): string {
        return this._uf_orgao_emissor;
    }

    set uf_orgao_emissor(value: string) {
        this._uf_orgao_emissor = value;
    }

    get data_nascimento(): string {
        return this._data_nascimento;
    }

    set data_nascimento(value: string) {
        this._data_nascimento = value;
    }

    get is_brasileiro(): boolean {
        return this._is_brasileiro;
    }

    set is_brasileiro(value: boolean) {
        this._is_brasileiro = value;
    }

    get nacionalidade(): number {
        return this._nacionalidade;
    }

    set nacionalidade(value: number) {
        this._nacionalidade = value;
    }

    get uf_naturalidade(): number {
        return this._uf_naturalidade;
    }

    set uf_naturalidade(value: number) {
        this._uf_naturalidade = value;
    }

    get naturalidade_estrangeira(): string {
        return this._naturalidade_estrangeira;
    }

    set naturalidade_estrangeira(value: string) {
        this._naturalidade_estrangeira = value;
    }

    get naturalidade(): number {
        return this._naturalidade;
    }

    set naturalidade(value: number) {
        this._naturalidade = value;
    }

    get estado_civil(): number {
        return this._estado_civil;
    }

    set estado_civil(value: number) {
        this._estado_civil = value;
    }

    get nome_mae(): string {
        return this._nome_mae;
    }

    set nome_mae(value: string) {
        this._nome_mae = value;
    }

    get nome_pai(): string {
        return this._nome_pai;
    }

    set nome_pai(value: string) {
        this._nome_pai = value;
    }

    get sexo(): string {
        return this._sexo;
    }

    set sexo(value: string) {
        this._sexo = value;
    }
}
