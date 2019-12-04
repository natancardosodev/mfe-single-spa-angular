import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://qa-dez-api.voxtecnologia.com.br/servicos/empresa-integrador',
        oauth: 'https://qa-dez.voxtecnologia.com.br',
        projeto: 'https://qa-dez.voxtecnologia.com.br/sigfacil/alterar-empresa',
        environments: 'https://qa-dez'
    }
};
