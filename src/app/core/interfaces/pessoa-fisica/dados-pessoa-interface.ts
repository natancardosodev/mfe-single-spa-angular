export interface EnderecoPessoaFisicaInterface {
    cep: number;
    logradouro: string;
    numero: number;
    bairro: string;
    complemento: string;
    municipio: string;
    uf: string;
    email: string;
    ddd_telefone: number;
    telefone: number;
    ddd_celular: number;
    celular: number;
}

export interface DadosPessoaInterface {
    nome: string;
    cpf: number;
    documento: number;
    uf_orgao_emissor: string;
    data_nascimento: string;
    nacionalidade: string;
    naturalidade_estrangeira: string;
    uf_naturalidade: string;
    naturalidade: string;
    estado_civil: string;
    nome_mae: string;
    nome_pai: string;
    sexo: string;
    endereco: EnderecoPessoaFisicaInterface;
}
