import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://qa-dois-api.voxtecnologia.com.br/servicos/nova-funcionalidade',
        oauth: 'https://qa-dois.voxtecnologia.com.br',
        projeto: 'https://qa-dois.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://qa-dois'
    }
};
