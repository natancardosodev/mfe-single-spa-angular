import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://qa-sete-api.voxtecnologia.com.br/servicos/empresa-integrador',
        oauth: 'https://qa-sete.voxtecnologia.com.br',
        projeto: 'https://qa-sete.voxtecnologia.com.br/sigfacil/alterar-empresa',
        environments: 'https://qa-sete'
    }
};
