export interface Modulo {
    id: number;
    nome: string;
    icone: string;
}

export interface FuncionalidadeInterface {
    id: number;
    nome: string;
    descricao: string;
    rota: string;
    modulo: Modulo;
}
