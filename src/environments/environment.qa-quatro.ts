import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://qa-quatro-api.voxtecnologia.com.br/servicos/empresa-integrador',
        oauth: 'https://qa-quatro.voxtecnologia.com.br',
        projeto: 'https://qa-quatro.voxtecnologia.com.br/sigfacil/alterar-empresa',
        environments: 'https://qa-quatro'
    }
};
