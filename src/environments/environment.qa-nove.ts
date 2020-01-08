import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://qa-nove-api.voxtecnologia.com.br/servicos/nova-funcionalidade',
        oauth: 'https://qa-nove.voxtecnologia.com.br',
        projeto: 'https://qa-nove.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://qa-nove'
    }
};
