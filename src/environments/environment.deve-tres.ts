import { EnvironmentInterface } from '../app/core/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-tres-nova-funcionalidade-service.voxtecnologia.com.br',
        oauth: 'https://deve-tres-nova-funcionalidade-service.voxtecnologia.com.br/connect/vox',
        assetsSigfacil: 'https://deve-tres-assets-sigfacil.voxtecnologia.com.br',
        jarvis: 'https://deve-tres-jarvis.voxtecnologia.com.br',
        projeto: 'https://deve-tres.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://deve-tres',
        subDomain: 'deve-tres'
    }
};
