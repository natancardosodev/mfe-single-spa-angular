export interface TipoLogradouro {
    id?: number;
    nome: string;
}

export interface Municipio {
    id: number;
    nome: string;
    estado: Estado;
}

export interface Estado {
    id: number;
    nome: string;
    sigle: string;
    pais: Pais;
}

export interface Pais {
    id: number;
    descricao: string;
    nacionalidade: string;
}

export interface EnderecoPorCepInterface {
    cep: string;
    tipo_logradouro: TipoLogradouro;
    logradouro: string;
    bairro: string;
    municipio: Municipio;
}
