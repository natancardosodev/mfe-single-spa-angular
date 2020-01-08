import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://qa-seis-api.voxtecnologia.com.br/servicos/nova-funcionalidade',
        oauth: 'https://qa-seis.voxtecnologia.com.br',
        projeto: 'https://qa-seis.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://qa-seis'
    }
};
