import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: true,
    uri: {
        api: 'https://deve-dois-api.voxtecnologia.com.br/servicos/nova-funcionalidade',
        oauth: 'https://deve-dois.voxtecnologia.com.br',
        projeto: 'https://deve-dois.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
        environments: 'https://deve-dois'
    }
};
