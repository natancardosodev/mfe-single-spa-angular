import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    deployUrl: 'https://deve.testes.com/micro-ng/',
    uri: {
        api: 'https://api.testes.com/internal/skeleton',
        oauth: 'https://autenticacao.testes.com',
        assetsSigfacil: 'https:/sigfacil.staticwsx.com.br',
        projeto: 'https://testes.com',
        environments: 'https://',
        subDomain: 'www'
    }
};
