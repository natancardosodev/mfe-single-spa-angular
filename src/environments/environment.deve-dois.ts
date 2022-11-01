import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-dois-nova-funcionalidade-internal-service.voxtecnologia.com.br',
        oauth: 'https://deve-dois.voxtecnologia.com.br',
        assetsSigfacil: 'https://deve-dois-assets-sigfacil.voxtecnologia.com.br',
        jarvis: 'https://deve-dois-jarvis.voxtecnologia.com.br',
        projeto: 'https://deve-dois.voxtecnologia.com.br/sigfacil/nova-funcionalidade/',
        environments: 'https://deve-dois',
        subDomain: 'deve-dois'
    }
};
