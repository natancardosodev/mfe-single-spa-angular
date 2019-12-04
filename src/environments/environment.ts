import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
  production: false,
  uri: {
    api: 'https://deve-api.voxtecnologia.com.br:5454/servicos/empresa-integrador',
    oauth: 'https://deve-autenticacao.voxtecnologia.com.br',
    projeto: 'https://deve.voxtecnologia.com.br/sigfacil/alterar-empresa',
    environments: 'https://deve'
  }
};
