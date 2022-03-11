export interface DadosInterface {
    key: number;
    value: string;
}

export interface OptionsCommonInterface {
    tipoDocumentoOptions?: DadosInterface;
    logradouroOptions?: DadosInterface;
    tipoImovelOptions?: DadosInterface;
    estadoOptions?: DadosInterface;
    classificacaoCrcOptions?: DadosInterface;
    tipoClassificacaoCrcOptions?: DadosInterface;
    escolaridadeOptions?: DadosInterface;
}
