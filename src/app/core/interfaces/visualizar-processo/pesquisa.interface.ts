export interface ParametrosPesquisaInterface {
    protocolo?: string;
    cpf?: string;
    status?: number;
    statusProcesso?: number;
    tipo?: string;
    data_inicio?: string;
    dataInicial?: string;
    data_fim?: string;
    dataFinal?: string;
}

export interface GridPesquisaInterface {
    total: number;
    processos: Array<DadosGridInterface>;
}

export interface DadosGridInterface {
    id: number;
    protocolo: string;
    nome: string;
    cpf: string;
    tipo: string;
    data_protocolado: string;
}
