import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://demo-legacy.{DOMINIO_REDESIM}/api/internal/skeleton',
        oauth: 'https://demo-autenticacao.{DOMINIO_REDESIM}',
        assetsSigfacil: 'https://demo-sigfacil.staticvox.com.br',
        jarvis: 'https://demo-legacy.{DOMINIO_REDESIM}/api/jarvis',
        projeto: 'https://interno.{DOMINIO_REDESIM}/sigfacil/skeleton',
        environments: 'https://demo',
        subDomain: 'demo'
    }
};
