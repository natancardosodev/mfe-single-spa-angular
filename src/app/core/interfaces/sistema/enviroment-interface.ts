export interface EnvironmentInterface {
    production: boolean;
    uri: {
        oauth: string;
        api: string;
        cdn: string;
        subDomain: string;
    };
    token?: {
        front: string;
    };
}
