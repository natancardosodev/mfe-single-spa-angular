import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://demo-api.voxtecnologia.com.br/servicos/empresa-integrador',
        oauth: 'https://demo.voxtecnologia.com.br',
        projeto: 'https://demo.voxtecnologia.com.br/sigfacil/alterar-empresa',
        environments: 'https://demo'
    }
};
