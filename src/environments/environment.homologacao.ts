import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://homologacao-legacy.{DOMINIO_REDESIM}/api/internal/skeleton',
        oauth: 'https://homologacao-autenticacao.{DOMINIO_REDESIM}',
        assetsSigfacil: 'https://homologacao-sigfacil.staticvox.com.br',
        jarvis: 'https://homologacao-legacy.{DOMINIO_REDESIM}/api/jarvis',
        projeto: 'https://interno.{DOMINIO_REDESIM}/sigfacil/skeleton',
        environments: 'https://homologacao',
        subDomain: 'homologacao'
    }
};
