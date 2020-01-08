import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-tres-api.voxtecnologia.com.br/servicos/nova-funcionalidade',
        oauth: 'https://deve-tres.voxtecnologia.com.br',
        projeto: 'https://deve-tres.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://deve-tres'
    }
};
