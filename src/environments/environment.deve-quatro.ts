import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-quatro-api.voxtecnologia.com.br/servicos/nome-do-projeto',
        oauth: 'https://deve-quatro.voxtecnologia.com.br',
        projeto: 'https://deve-quatro.voxtecnologia.com.br/sigfacil/nome-do-projeto',
        environments: 'https://deve-quatro'
    }
};
