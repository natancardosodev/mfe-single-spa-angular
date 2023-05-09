import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-nove-nova-funcionalidade-internal-service.voxtecnologia.com.br',
        oauth: 'https://deve-nove.voxtecnologia.com.br',
        assetsSigfacil: 'https://deve-nove-sigfacil.staticvox.com.br',
        jarvis: 'https://deve-nove-jarvis.voxtecnologia.com.br',
        projeto: 'https://deve-nove.voxtecnologia.com.br/sigfacil/nova-funcionalidade/',
        environments: 'https://deve-nove',
        subDomain: 'deve-nove'
    }
};
