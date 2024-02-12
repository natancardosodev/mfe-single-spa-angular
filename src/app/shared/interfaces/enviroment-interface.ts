export interface EnvironmentInterface {
    production: boolean;
    uri: {
        oauth: string;
        api: string;
        projeto: string;
        cdn: string;
        jarvis: string;
        environments: string;
        subDomain: string;
    };
}
