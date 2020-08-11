export interface HttpOptions {
    body?: any;
    headers?: any;
    // headers?: HttpHeaders | {
    //     [header: string]: string | string[];
    // };
    observe?: 'body';
    // params?: HttpParams | {
    //     [param: string]: string | string[];
    // };
    params?: any;
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'json' | 'text';
    withCredentials?: boolean;
}
