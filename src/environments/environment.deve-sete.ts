import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-sete-api.voxtecnologia.com.br/servicos/nome-do-projeto',
        oauth: 'https://deve-sete.voxtecnologia.com.br',
        projeto: 'https://deve-sete.voxtecnologia.com.br/sigfacil/nome-do-projeto',
        environments: 'https://deve-sete'
    }
};
