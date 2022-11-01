import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: false,
    uri: {
        api: 'https://deve-nova-funcionalidade-internal-service.voxtecnologia.com.br',
        oauth: 'https://deve.voxtecnologia.com.br',
        assetsSigfacil: 'https://deve-assets-sigfacil.voxtecnologia.com.br',
        jarvis: 'https://deve-jarvis.voxtecnologia.com.br',
        projeto: 'https://front.voxtecnologia.com.br/skeleton/interno/',
        environments: 'https://deve',
        subDomain: 'deve'
    }
};
