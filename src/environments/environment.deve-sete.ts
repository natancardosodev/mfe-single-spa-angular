import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-sete-legacy.{DOMINIO_REDESIM}/api/internal/skeleton',
        oauth: 'https://deve-sete-autenticacao.{DOMINIO_REDESIM}',
        assetsSigfacil: 'https://deve-sete-sigfacil.staticvox.com.br',
        jarvis: 'https://deve-sete-legacy.{DOMINIO_REDESIM}/api/jarvis',
        projeto: 'https://interno.{DOMINIO_REDESIM}/sigfacil/skeleton',
        environments: 'https://deve-sete',
        subDomain: 'deve-sete'
    }
};
