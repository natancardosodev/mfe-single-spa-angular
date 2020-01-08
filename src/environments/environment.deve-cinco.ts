import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-cinco-api.voxtecnologia.com.br/servicos/nova-funcionalidade',
        oauth: 'https://deve-cinco.voxtecnologia.com.br',
        projeto: 'https://deve-cinco.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://deve-cinco'
    }
};
