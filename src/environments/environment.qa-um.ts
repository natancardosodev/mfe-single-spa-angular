import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://qa-um-api.voxtecnologia.com.br/servicos/empresa-integrador',
        oauth: 'https://qa-um.voxtecnologia.com.br',
        projeto: 'https://qa-um.voxtecnologia.com.br/sigfacil/alterar-empresa',
        environments: 'https://qa-um'
    }
};
