export interface EnvironmentInterface {
    production: boolean;
    deployUrl: string;
    uri: {
        oauth: string;
        api: string;
        projeto: string;
        assetsSigfacil: string;
        jarvis: string;
        environments: string;
        subDomain: string;
    };
    token?: {
        front: string;
    };
}
