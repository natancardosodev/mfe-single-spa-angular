import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: false,
    deployUrl: 'https://deve.testes.com/micro-ng/',
    uri: {
        api: 'https://deve-legacy.{DOMINIO_REDESIM}/api/internal/skeleton',
        oauth: 'https://deve-autenticacao.{DOMINIO_REDESIM}',
        assetsSigfacil: 'https://deve-sigfacil.staticvox.com.br',
        jarvis: 'https://deve-legacy.{DOMINIO_REDESIM}/api/jarvis',
        projeto: 'https://interno.{DOMINIO_REDESIM}/sigfacil/skeleton',
        environments: 'https://deve',
        subDomain: 'deve'
    },
    token: {
        front: 'K42jWs8czrfPQ5WEwjd_'
    }
};
