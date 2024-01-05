import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: false,
    uri: {
        api: 'https://deve-legacy.{DOMINIO_REDESIM}/api/internal/skeleton',
        oauth: 'https://deve-autenticacao.{DOMINIO_REDESIM}',
        assetsSigfacil: 'https://deve-sigfacil.staticvox.com.br',
        jarvis: 'https://deve-legacy.{DOMINIO_REDESIM}/api/jarvis',
        projeto: 'https://interno.{DOMINIO_REDESIM}/sigfacil/skeleton',
        environments: 'https://deve',
        subDomain: 'deve'
    }
};
