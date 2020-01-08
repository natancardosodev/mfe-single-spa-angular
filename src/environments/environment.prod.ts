import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
  production: true,
  uri: {
    api: 'https://api.voxtecnologia.com.br/servicos/nova-funcionalidade',
    oauth: 'https://autenticacao.voxtecnologia.com.br',
    projeto: 'https://voxtecnologia.com.br/sigfacil/nova-funcionalidade',
    environments: 'https://'
  }
};
