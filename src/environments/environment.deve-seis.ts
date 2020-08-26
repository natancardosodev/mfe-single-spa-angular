import { EnvironmentInterface } from '../app/core/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-seis-nova-funcionalidade-service.voxtecnologia.com.br',
        oauth: 'https://deve-seis-nova-funcionalidade-service.voxtecnologia.com.br/connect/vox',
        projeto: 'https://deve-seis.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://deve-seis',
        subDomain: 'deve-seis'
    }
};
