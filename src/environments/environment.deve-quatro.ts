import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-quatro-legacy.{DOMINIO_REDESIM}/api/internal/skeleton',
        oauth: 'https://deve-quatro-autenticacao.{DOMINIO_REDESIM}',
        assetsSigfacil: 'https://deve-quatro-sigfacil.staticvox.com.br',
        jarvis: 'https://deve-quatro-legacy.{DOMINIO_REDESIM}/api/jarvis',
        projeto: 'https://interno.{DOMINIO_REDESIM}/sigfacil/skeleton',
        environments: 'https://deve-quatro',
        subDomain: 'deve-quatro'
    }
};
