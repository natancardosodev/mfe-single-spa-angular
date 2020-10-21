export interface HttpOptions {
    body?: any;
    headers?: any;
    // headers?: HttpHeaders | {
    //     [header: string]: string | string[];
    // };
    observe?: 'events' | 'body' | 'response';
    // params?: HttpParams | {
    //     [param: string]: string | string[];
    // };
    params?: any;
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'json' | 'text' | 'blob';
    withCredentials?: boolean;
}
