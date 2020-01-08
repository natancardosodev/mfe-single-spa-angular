import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
  production: false,
  uri: {
    api: 'https://deve-api.voxtecnologia.com.br:5454/servicos/nova-funcionalidade',
    oauth: 'https://deve-autenticacao.voxtecnologia.com.br',
    projeto: 'https://deve.voxtecnologia.com.br/sigfacil/nova-funcionalidade',
    environments: 'https://deve'
  }
};
