import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://qa-oito-api.voxtecnologia.com.br/servicos/nova-funcionalidade',
        oauth: 'https://qa-oito.voxtecnologia.com.br',
        projeto: 'https://qa-oito.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://qa-oito'
    }
};
