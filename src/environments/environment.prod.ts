import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://legacy.{DOMINIO_REDESIM}/api/internal/skeleton',
        oauth: 'https://autenticacao.{DOMINIO_REDESIM}',
        assetsSigfacil: 'https:/sigfacil.staticvox.com.br',
        jarvis: 'https://www.{DOMINIO_REDESIM}/api/jarvis',
        projeto: 'https://interno.{DOMINIO_REDESIM}/sigfacil/skeleton',
        environments: 'https://',
        subDomain: 'www'
    }
};
