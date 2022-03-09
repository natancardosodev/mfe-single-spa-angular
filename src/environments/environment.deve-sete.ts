import { EnvironmentInterface } from '@core/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-sete-nova-funcionalidade-internal-service.voxtecnologia.com.br',
        oauth: 'https://deve-sete.voxtecnologia.com.br',
        assetsSigfacil: 'https://deve-sete-assets-sigfacil.voxtecnologia.com.br',
        jarvis: 'https://deve-sete-jarvis.voxtecnologia.com.br',
        projeto: 'https://deve-sete.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://deve-sete',
        subDomain: 'deve-sete'
    }
};
