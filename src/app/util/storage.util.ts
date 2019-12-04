export class StorageUtil {
  public static store(key: string, dados: any): void {
      const dadosStorage = btoa(JSON.stringify(dados));
      sessionStorage.setItem(key, dadosStorage);
  }

  public static get(key: string): any {
      const savedData = JSON.parse(atob(sessionStorage.getItem(key)));
      return savedData;
  }
}
