import { EnvironmentInterface } from './../app/interfaces/enviroment-interface';

export const environment: EnvironmentInterface = {
  production: true,
  uri: {
    api: 'https://api.voxtecnologia.com.br/servicos/empresa-integrador',
    oauth: 'https://autenticacao.voxtecnologia.com.br',
    projeto: 'https://voxtecnologia.com.br/sigfacil/alterar-empresa',
    environments: 'https://'
  }
};
