import { EnvironmentInterface } from '@core/interfaces/sistema/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://homologacao-nova-funcionalidade-internal-service.voxtecnologia.com.br',
        oauth: 'https://homologacao.voxtecnologia.com.br',
        assetsSigfacil: 'https://homologacao-sigfacil.staticvox.com.br',
        jarvis: 'https://homologacao-jarvis.voxtecnologia.com.br',
        projeto: 'https://homologacao.voxtecnologia.com.br/sigfacil/nova-funcionalidade/',
        environments: 'https://homologacao',
        subDomain: 'homologacao'
    }
};
