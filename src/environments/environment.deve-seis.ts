import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-seis-legacy.{DOMINIO_REDESIM}/api/internal/skeleton',
        oauth: 'https://deve-seis-autenticacao.{DOMINIO_REDESIM}',
        assetsSigfacil: 'https://deve-seis-sigfacil.staticvox.com.br',
        jarvis: 'https://deve-seis-legacy.{DOMINIO_REDESIM}/api/jarvis',
        projeto: 'https://interno.{DOMINIO_REDESIM}/sigfacil/skeleton',
        environments: 'https://deve-seis',
        subDomain: 'deve-seis'
    }
};
