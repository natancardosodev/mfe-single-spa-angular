import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://homologacao-api.voxtecnologia.com.br/servicos/empresa-integrador',
        oauth: 'https://homologacao.voxtecnologia.com.br',
        projeto: 'https://homologacao.voxtecnologia.com.br/sigfacil/alterar-empresa',
        environments: 'https://homologacao'
    }
};
