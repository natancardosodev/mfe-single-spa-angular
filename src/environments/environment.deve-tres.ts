import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-tres-legacy.{DOMINIO_REDESIM}/api/internal/skeleton',
        oauth: 'https://deve-tres-autenticacao.{DOMINIO_REDESIM}',
        assetsSigfacil: 'https://deve-tres-sigfacil.staticvox.com.br',
        jarvis: 'https://deve-tres-legacy.{DOMINIO_REDESIM}/api/jarvis',
        projeto: 'https://interno.{DOMINIO_REDESIM}/sigfacil/skeleton',
        environments: 'https://deve-tres',
        subDomain: 'deve-tres'
    }
};
