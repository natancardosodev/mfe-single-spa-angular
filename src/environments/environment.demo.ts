import { EnvironmentInterface } from '@core/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://demo-nova-funcionalidade-internal-service.voxtecnologia.com.br',
        oauth: 'https://demo.voxtecnologia.com.br',
        assetsSigfacil: 'https://demo-assets-sigfacil.voxtecnologia.com.br',
        jarvis: 'https://demo-jarvis.voxtecnologia.com.br',
        projeto: 'https://demo.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://demo',
        subDomain: 'demo'
    }
};
