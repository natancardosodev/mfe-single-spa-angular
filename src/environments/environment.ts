import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: false,
    deployUrl: 'https://deve.testes.com/micro-ng/',
    uri: {
        api: 'https://deve-legacy.testes.com/api/internal/skeleton',
        oauth: 'https://deve-autenticacao.testes.com',
        assetsSigfacil: 'https://deve-sigfacil.staticwsx.com.br',
        projeto: 'https://deve.testes.com',
        environments: 'https://deve',
        subDomain: 'deve'
    },
    token: {
        front: 'K42jWs8czrfPQ5WEwjd_'
    }
};
