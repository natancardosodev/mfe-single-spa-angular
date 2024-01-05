import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-dez-legacy.{DOMINIO_REDESIM}/api/internal/skeleton',
        oauth: 'https://deve-dez-autenticacao.{DOMINIO_REDESIM}',
        assetsSigfacil: 'https://deve-dez-sigfacil.staticvox.com.br',
        jarvis: 'https://deve-dez-legacy.{DOMINIO_REDESIM}/api/jarvis',
        projeto: 'https://interno.{DOMINIO_REDESIM}/sigfacil/skeleton',
        environments: 'https://deve-dez',
        subDomain: 'deve-dez'
    }
};
