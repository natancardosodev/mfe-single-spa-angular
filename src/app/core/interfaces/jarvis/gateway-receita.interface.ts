export interface GatewayReceitaInterface {
    numCPF: string;
    nome: string;
    dataNascimento: string;
    sexo: string;
    residenteExterior: string;
    situacaoCadastral: string;
    nacionalidade: string;
    nomeMae: string;
    naturalidade: string;
    anoObito: string;
    endereco: {
        cep: string;
        uf: string;
        codMunicipio: string;
        logradouro: string;
        numLogradouro: string;
        complementoLogradouro: string;
        bairro: string;
        codPais: string;
    };
}
