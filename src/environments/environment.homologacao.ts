import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://homologacao-api.voxtecnologia.com.br/servicos/nova-funcionalidade',
        oauth: 'https://homologacao.voxtecnologia.com.br',
        projeto: 'https://homologacao.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://homologacao'
    }
};
