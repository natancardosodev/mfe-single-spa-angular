import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-tres-api.voxtecnologia.com.br/servicos/nome-do-projeto',
        oauth: 'https://deve-tres.voxtecnologia.com.br',
        projeto: 'https://deve-tres.voxtecnologia.com.br/sigfacil/nome-do-projeto',
        environments: 'https://deve-tres'
    }
};
