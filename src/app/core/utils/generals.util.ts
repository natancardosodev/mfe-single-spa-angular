export class GeneralsUtil {
    public static delay(ms: number): Promise<any> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    public static isEmpty(dado: Record<string, string>): boolean {
        return !Object.keys(dado).length;
    }
}
