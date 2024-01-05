import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-dois-legacy.{DOMINIO_REDESIM}/api/internal/skeleton',
        oauth: 'https://deve-dois-autenticacao.{DOMINIO_REDESIM}',
        assetsSigfacil: 'https://deve-dois-sigfacil.staticvox.com.br',
        jarvis: 'https://deve-dois-legacy.{DOMINIO_REDESIM}/api/jarvis',
        projeto: 'https://interno.{DOMINIO_REDESIM}/sigfacil/skeleton',
        environments: 'https://deve-dois',
        subDomain: 'deve-dois'
    }
};
