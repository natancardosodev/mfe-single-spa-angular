import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-dois-api.voxtecnologia.com.br/servicos/nome-do-projeto',
        oauth: 'https://deve-dois.voxtecnologia.com.br',
        projeto: 'https://deve-dois.voxtecnologia.com.br/sigfacil/nome-do-projeto',
        environments: 'https://deve-dois'
    }
};
