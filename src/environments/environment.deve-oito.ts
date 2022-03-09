import { EnvironmentInterface } from '@core/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-oito-nova-funcionalidade-internal-service.voxtecnologia.com.br',
        oauth: 'https://deve-oito.voxtecnologia.com.br',
        assetsSigfacil: 'https://deve-oito-assets-sigfacil.voxtecnologia.com.br',
        jarvis: 'https://deve-oito-jarvis.voxtecnologia.com.br',
        projeto: 'https://deve-oito.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://deve-oito',
        subDomain: 'deve-oito'
    }
};
