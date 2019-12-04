import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-dez-api.voxtecnologia.com.br/servicos/nome-do-projeto',
        oauth: 'https://deve-dez.voxtecnologia.com.br',
        projeto: 'https://deve-dez.voxtecnologia.com.br/sigfacil/nome-do-projeto',
        environments: 'https://deve-dez'
    }
};
