import { EnvironmentInterface } from '../app/core/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-cinco-nova-funcionalidade-service.voxtecnologia.com.br',
        oauth: 'https://deve-cinco-nova-funcionalidade-service.voxtecnologia.com.br/connect/vox',
        assetsSigfacil: 'https://deve-cinco-assets-sigfacil.voxtecnologia.com.br',
        jarvis: 'https://deve-cinco-jarvis.voxtecnologia.com.br',
        projeto: 'https://deve-cinco.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://deve-cinco',
        subDomain: 'deve-cinco'
    }
};
