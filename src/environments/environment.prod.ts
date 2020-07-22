import { EnvironmentInterface } from '../app/core/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://nova-funcionalidade-service.voxtecnologia.com.br',
        oauth: 'https://autenticacao.voxtecnologia.com.br',
        projeto: 'https://voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://',
        subDomain: 'www'
    }
};
