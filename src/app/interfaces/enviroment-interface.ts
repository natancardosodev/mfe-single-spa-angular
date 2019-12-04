export interface EnvironmentInterface {
  production: boolean;
  uri: {
    oauth: string,
    api: string,
    projeto: string,
    environments: string,
  };
}
