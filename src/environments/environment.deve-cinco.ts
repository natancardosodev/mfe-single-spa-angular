import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-cinco-api.voxtecnologia.com.br/servicos/nome-do-projeto',
        oauth: 'https://deve-cinco.voxtecnologia.com.br',
        projeto: 'https://deve-cinco.voxtecnologia.com.br/sigfacil/nome-do-projeto',
        environments: 'https://deve-cinco'
    }
};
