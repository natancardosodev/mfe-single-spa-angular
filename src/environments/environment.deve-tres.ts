import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-tres-nova-funcionalidade-internal-service.voxtecnologia.com.br',
        oauth: 'https://deve-tres.voxtecnologia.com.br',
        assetsSigfacil: 'https://deve-tres-sigfacil.staticvox.com.br',
        jarvis: 'https://deve-tres-jarvis.voxtecnologia.com.br',
        projeto: 'https://deve-tres.voxtecnologia.com.br/sigfacil/nova-funcionalidade/',
        environments: 'https://deve-tres',
        subDomain: 'deve-tres'
    }
};
