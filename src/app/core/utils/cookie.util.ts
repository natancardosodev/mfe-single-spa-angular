export class CookieUtil {
    public static store(key: string, dados: any, expireDays: number, path = '/'): void {
        const dadosCookie = btoa(JSON.stringify(dados));
        const expires = new Date();
        expires.setTime(expires.getTime() + expireDays * 1000 * 60 * 60 * 24);
        const cookie = `${key}=${dadosCookie}; expires=${expires.toUTCString()};path=${path}`;
        document.cookie = cookie;
    }

    public static get(key: string): any {
        const cookie = document.cookie.split('; ').find((row) => row.startsWith(`${key}=`));
        try {
            return JSON.parse(atob(cookie.split('=')[1]));
        } catch (erro) {
            return null;
        }
    }

    public static getAll(): Array<{ key: string; value: string }> {
        const documentCookie = document.cookie.split(';');
        return documentCookie.map((cookie: string) => {
            const parsedCookie = cookie.replace(' ', '').split('=');
            return {
                key: parsedCookie[0],
                value: parsedCookie[1]
            };
        });
    }

    public static remove(key: string): void {
        document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT'; path=/`;
    }

    public static removeAll(): void {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const key = cookies[i].indexOf('=') > -1 ? cookies[i].substr(0, cookies[i].indexOf('=')) : cookies[i];
            document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        }
    }
}
