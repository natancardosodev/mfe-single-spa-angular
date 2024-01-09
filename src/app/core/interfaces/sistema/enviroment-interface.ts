export interface EnvironmentInterface {
    production: boolean;
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
