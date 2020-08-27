import { EnvironmentInterface } from '../app/core/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-oito-nova-funcionalidade-service.voxtecnologia.com.br',
        oauth: 'https://deve-oito-nova-funcionalidade-service.voxtecnologia.com.br/connect/vox',
        projeto: 'https://deve-oito.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://deve-oito',
        subDomain: 'deve-oito'
    }
};
