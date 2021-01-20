import { Pessoa } from './pessoa';
import { Endereco } from './endereco';

export class Leiloeiro {
    private _uf: string;
    private _pessoa: Pessoa;
    private _endereco: Endereco;

    constructor({ uf = null, pessoa = null, endereco = null }) {
        this._uf = uf;
        this._pessoa = new Pessoa(pessoa);
        this._endereco = new Endereco(endereco);
    }

    get uf(): string {
        return this._uf;
    }

    set uf(value: string) {
        this._uf = value;
    }

    get pessoa(): Pessoa {
        return this._pessoa;
    }

    set pessoa(value: Pessoa) {
        this._pessoa = value;
    }

    get endereco(): Endereco {
        return this._endereco;
    }

    set endereco(value: Endereco) {
        this._endereco = value;
    }
}
