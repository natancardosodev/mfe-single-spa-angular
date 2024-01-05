import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-um-legacy.{DOMINIO_REDESIM}/api/internal/skeleton',
        oauth: 'https://deve-um-autenticacao.{DOMINIO_REDESIM}',
        assetsSigfacil: 'https://deve-um-sigfacil.staticvox.com.br',
        jarvis: 'https://deve-um-legacy.{DOMINIO_REDESIM}/api/jarvis',
        projeto: 'https://interno.{DOMINIO_REDESIM}/sigfacil/skeleton',
        environments: 'https://deve-um',
        subDomain: 'deve-um'
    }
};
