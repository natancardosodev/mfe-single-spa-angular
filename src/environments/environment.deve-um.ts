import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-um-api.voxtecnologia.com.br/servicos/nova-funcionalidade',
        oauth: 'https://deve-um.voxtecnologia.com.br',
        projeto: 'https://deve-um.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://deve-um'
    }
};
