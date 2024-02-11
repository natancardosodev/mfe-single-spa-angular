export declare interface FormBase {
    getFirstErrorFrom(controlName: string, label: string): string;

    markAllAsTouched(): void;

    getDados(args?: unknown): unknown;

    setValues(data: unknown): void;
}
