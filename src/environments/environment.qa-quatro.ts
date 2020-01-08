import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://qa-quatro-api.voxtecnologia.com.br/servicos/nova-funcionalidade',
        oauth: 'https://qa-quatro.voxtecnologia.com.br',
        projeto: 'https://qa-quatro.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://qa-quatro'
    }
};
