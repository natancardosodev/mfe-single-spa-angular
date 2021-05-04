import { EnvironmentInterface } from '@core/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-um-nova-funcionalidade-service.voxtecnologia.com.br',
        oauth: 'https://deve-um-nova-funcionalidade-service.voxtecnologia.com.br/connect/vox',
        assetsSigfacil: 'https://deve-um-assets-sigfacil.voxtecnologia.com.br',
        jarvis: 'https://deve-um-jarvis.voxtecnologia.com.br',
        projeto: 'https://deve-um.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://deve-um',
        subDomain: 'deve-um'
    }
};
