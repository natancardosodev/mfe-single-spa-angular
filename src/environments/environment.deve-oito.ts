import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-oito-legacy.{DOMINIO_REDESIM}/api/internal/skeleton',
        oauth: 'https://deve-oito-autenticacao.{DOMINIO_REDESIM}',
        assetsSigfacil: 'https://deve-oito-sigfacil.staticvox.com.br',
        jarvis: 'https://deve-oito-legacy.{DOMINIO_REDESIM}/api/jarvis',
        projeto: 'https://interno.{DOMINIO_REDESIM}/sigfacil/skeleton',
        environments: 'https://deve-oito',
        subDomain: 'deve-oito'
    }
};
