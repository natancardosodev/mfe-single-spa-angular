import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://qa-sete-api.voxtecnologia.com.br/servicos/nova-funcionalidade',
        oauth: 'https://qa-sete.voxtecnologia.com.br',
        projeto: 'https://qa-sete.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://qa-sete'
    }
};
