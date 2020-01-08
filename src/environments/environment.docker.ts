import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
    production: false,
    uri: {
      api: 'https://deve-api.voxtecnologia.com.br:5454/servicos/nova-funcionalidade',
      oauth: 'https://deve.voxtecnologia.com.br',
      projeto: 'https://deve.voxtecnologia.com.br:4493/sigfacil/nova-funcionalidade',
      environments: 'https://deve'
    }
};

