import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-quatro-api.voxtecnologia.com.br/servicos/nova-funcionalidade',
        oauth: 'https://deve-quatro.voxtecnologia.com.br',
        projeto: 'https://deve-quatro.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://deve-quatro'
    }
};
