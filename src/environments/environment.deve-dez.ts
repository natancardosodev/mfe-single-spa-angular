import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-dez-nova-funcionalidade-internal-service.voxtecnologia.com.br',
        oauth: 'https://deve-dez.voxtecnologia.com.br',
        assetsSigfacil: 'https://deve-dez-sigfacil.staticvox.com.br',
        jarvis: 'https://deve-dez-jarvis.voxtecnologia.com.br',
        projeto: 'https://deve-dez.voxtecnologia.com.br/sigfacil/nova-funcionalidade/',
        environments: 'https://deve-dez',
        subDomain: 'deve-dez'
    }
};
