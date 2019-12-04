import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-seis-api.voxtecnologia.com.br/servicos/nome-do-projeto',
        oauth: 'https://deve-seis.voxtecnologia.com.br',
        projeto: 'https://deve-seis.voxtecnologia.com.br/sigfacil/nome-do-projeto',
        environments: 'https://deve-seis'
    }
};
