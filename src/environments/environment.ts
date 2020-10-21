import { EnvironmentInterface } from '../app/core/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: false,
    uri: {
        api: 'https://deve-nova-funcionalidade-service.voxtecnologia.com.br',
        oauth: 'https://deve-nova-funcionalidade-service.voxtecnologia.com.br/connect/vox',
        assetsSigfacil: 'https://deve-assets-sigfacil.voxtecnologia.com.br',
        jarvis: 'https://deve-jarvis.voxtecnologia.com.br',
        projeto: 'https://deve.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://deve',
        subDomain: 'deve'
    }
};
