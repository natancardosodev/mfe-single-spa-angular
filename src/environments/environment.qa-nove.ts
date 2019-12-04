import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://qa-nove-api.voxtecnologia.com.br/servicos/empresa-integrador',
        oauth: 'https://qa-nove.voxtecnologia.com.br',
        projeto: 'https://qa-nove.voxtecnologia.com.br/sigfacil/alterar-empresa',
        environments: 'https://qa-nove'
    }
};
