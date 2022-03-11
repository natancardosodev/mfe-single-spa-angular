import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-seis-nova-funcionalidade-internal-service.voxtecnologia.com.br',
        oauth: 'https://deve-seis.voxtecnologia.com.br',
        assetsSigfacil: 'https://deve-seis-assets-sigfacil.voxtecnologia.com.br',
        jarvis: 'https://deve-seis-jarvis.voxtecnologia.com.br',
        projeto: 'https://deve-seis.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://deve-seis',
        subDomain: 'deve-seis'
    }
};
