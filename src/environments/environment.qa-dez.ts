import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://qa-dez-api.voxtecnologia.com.br/servicos/nova-funcionalidadeo',
        oauth: 'https://qa-dez.voxtecnologia.com.br',
        projeto: 'https://qa-dez.voxtecnologia.com.br/sigfacil/nova-funcionalidadeo',
        environments: 'https://qa-dez'
    }
};
