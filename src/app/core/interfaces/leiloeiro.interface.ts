import { EnderecoInterface } from './endereco.interface';
import { PessoaInterface } from './pessoa.interface';

export interface LeiloeiroInterface {
    uf: string;
    protocolo?: string;
    pessoa: PessoaInterface;
    endereco: EnderecoInterface;
}
