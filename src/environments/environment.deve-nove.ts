import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-nove-api.voxtecnologia.com.br/servicos/nova-funcionalidade',
        oauth: 'https://deve-nove.voxtecnologia.com.br',
        projeto: 'https://deve-nove.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://deve-nove'
    }
};
