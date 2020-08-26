export class StorageUtil {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public static store(key: string, dados: any): void {
        const dadosStorage = btoa(JSON.stringify(dados));
        window.sessionStorage.setItem(key, dadosStorage);
    }

    public static get(key: string): any {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return window.sessionStorage.getItem(key) ? JSON.parse(atob(sessionStorage.getItem(key))) : null;
    }

    public static remove(key: string): any {
        return window.sessionStorage.removeItem(key);
    }
}
