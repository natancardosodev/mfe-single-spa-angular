import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://nova-funcionalidade-internal-service.voxtecnologia.com.br',
        oauth: 'https://autenticacao.voxtecnologia.com.br',
        assetsSigfacil: 'https://assets-sigfacil.voxtecnologia.com.br',
        jarvis: 'https://jarvis.voxtecnologia.com.br',
        projeto: 'https://voxtecnologia.com.br/sigfacil/nova-funcionalidade/',
        environments: 'https://',
        subDomain: 'www'
    }
};
