import { EnvironmentInterface } from '@core/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://homologacao-nova-funcionalidade-service.voxtecnologia.com.br',
        oauth: 'https://homologacao-nova-funcionalidade-service.voxtecnologia.com.br/connect/vox',
        assetsSigfacil: 'https://homologacao-assets-sigfacil.voxtecnologia.com.br',
        jarvis: 'https://homologacao-jarvis.voxtecnologia.com.br',
        projeto: 'https://homologacao.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://homologacao',
        subDomain: 'homologacao'
    }
};
