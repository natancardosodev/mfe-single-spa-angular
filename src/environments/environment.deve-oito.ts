import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-oito-api.voxtecnologia.com.br/servicos/nova-funcionalidade',
        oauth: 'https://deve-oito.voxtecnologia.com.br',
        projeto: 'https://deve-oito.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://deve-oito'
    }
};
