import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-quatro-nova-funcionalidade-internal-service.voxtecnologia.com.br',
        oauth: 'https://deve-quatro.voxtecnologia.com.br',
        assetsSigfacil: 'https://deve-quatro-assets-sigfacil.voxtecnologia.com.br',
        jarvis: 'https://deve-quatro-jarvis.voxtecnologia.com.br',
        projeto: 'https://deve-quatro.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://deve-quatro',
        subDomain: 'deve-quatro'
    }
};
