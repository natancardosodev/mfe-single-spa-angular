import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://api.testes.com/internal/skeleton',
        oauth: 'https://autenticacao.testes.com',
        cdn: 'https:/sigfacil.staticwsx.com.br',
        subDomain: 'www'
    },
    token: {
        front: 'S67jNs8czrfP46WEwjd_'
    }
};
