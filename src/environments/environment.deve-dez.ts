import { EnvironmentInterface } from '../app/core/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-dez-nova-funcionalidade-service.voxtecnologia.com.br',
        oauth: 'https://deve-dez-nova-funcionalidade-service.voxtecnologia.com.br/connect/vox',
        projeto: 'https://deve-dez.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://deve-dez',
        subDomain: 'deve-dez'
    }
};
