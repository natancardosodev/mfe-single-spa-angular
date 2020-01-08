import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://qa-cinco-api.voxtecnologia.com.br/servicos/nova-funcionalidade',
        oauth: 'https://qa-cinco.voxtecnologia.com.br',
        projeto: 'https://qa-cinco.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://qa-cinco'
    }
};
