import { EnvironmentInterface } from '../app/core/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://homologacao-nova-funcionalidade-service.voxtecnologia.com.br',
        oauth: 'https://homologacao.voxtecnologia.com.br',
        projeto: 'https://homologacao.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://homologacao',
        subDomain: 'homologacao'
    }
};
