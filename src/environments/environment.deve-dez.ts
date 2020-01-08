import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-dez-api.voxtecnologia.com.br/servicos/nova-funcionalidade',
        oauth: 'https://deve-dez.voxtecnologia.com.br',
        projeto: 'https://deve-dez.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://deve-dez'
    }
};
