import { EnvironmentInterface } from '../app/core/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: false,
    uri: {
        api: 'https://deve-nova-funcionalidade-service.voxtecnologia.com.br',
        oauth: 'https://deve-nova-funcionalidade-service.voxtecnologia.com.br/connect/vox',
        projeto: 'https://deve.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://deve',
        subDomain: 'deve'
    }
};
