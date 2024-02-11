export interface EnvironmentInterface {
    production: boolean;
    deployUrl: string;
    uri: {
        oauth: string;
        api: string;
        projeto: string;
        assetsSigfacil: string;
        environments: string;
        subDomain: string;
    };
    token?: {
        front: string;
    };
}
