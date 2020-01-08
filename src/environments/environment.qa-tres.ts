import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://qa-tres-api.voxtecnologia.com.br/servicos/nova-funcionalidade',
        oauth: 'https://qa-tres.voxtecnologia.com.br',
        projeto: 'https://qa-tres.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://qa-tres'
    }
};
