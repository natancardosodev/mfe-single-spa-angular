import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://qa-seis-api.voxtecnologia.com.br/servicos/empresa-integrador',
        oauth: 'https://qa-seis.voxtecnologia.com.br',
        projeto: 'https://qa-seis.voxtecnologia.com.br/sigfacil/alterar-empresa',
        environments: 'https://qa-seis'
    }
};
