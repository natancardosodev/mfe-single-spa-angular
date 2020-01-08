import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-sete-api.voxtecnologia.com.br/servicos/nova-funcionalidadeo',
        oauth: 'https://deve-sete.voxtecnologia.com.br',
        projeto: 'https://deve-sete.voxtecnologia.com.br/sigfacil/nova-funcionalidadeo',
        environments: 'https://deve-sete'
    }
};
