import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://qa-dois-api.voxtecnologia.com.br/servicos/empresa-integrador',
        oauth: 'https://qa-dois.voxtecnologia.com.br',
        projeto: 'https://qa-dois.voxtecnologia.com.br/sigfacil/alterar-empresa',
        environments: 'https://qa-dois'
    }
};
