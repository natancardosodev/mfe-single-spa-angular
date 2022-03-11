export interface User {
    id: number;
    nome: string;
    cpf: string;
    papel: Array<string>;
    estado: string;
}

export interface UserPermissoes {
    inserir: boolean;
    alterar: boolean;
    excluir: boolean;
    visualizar: boolean;
}
