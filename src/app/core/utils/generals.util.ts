export class GeneralsUtil {
    public static delay(ms: number): Promise<any> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    public static isEmpty(dado: Record<string, string>): boolean {
        return !Object.keys(dado).length;
    }

    /**
     * Formating date from YYYY-MM-DD to MM/DD/YYYY
     * Alternativa ao new Date().toLocaleDateString('pt-BR')
     * @param date string
     */
    public static formatDateEnToBr(date: string): string {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    }
}
