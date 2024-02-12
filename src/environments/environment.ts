import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: false,
    uri: {
        api: 'https://deve-legacy.testes.com/api/internal/skeleton',
        oauth: 'https://deve-autenticacao.testes.com',
        cdn: 'https://assets.testes.com.br',
        subDomain: 'deve'
    },
    token: {
        front: 'S67jNs8czrfP46WEwjd_'
    }
};
