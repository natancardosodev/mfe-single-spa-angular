export interface UsuarioLogadoInterface {
    id: number;
    nome: string;
    cpf: string;
    papel: Array<string>;
    estado: string;
    urlBase: string;
    perfil: string;
}
