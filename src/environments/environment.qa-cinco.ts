import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://qa-cinco-api.voxtecnologia.com.br/servicos/empresa-integrador',
        oauth: 'https://qa-cinco.voxtecnologia.com.br',
        projeto: 'https://qa-cinco.voxtecnologia.com.br/sigfacil/alterar-empresa',
        environments: 'https://qa-cinco'
    }
};
