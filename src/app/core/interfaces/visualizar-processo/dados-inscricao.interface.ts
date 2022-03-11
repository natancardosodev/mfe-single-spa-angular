export interface DadosInscricaoInterface {
    protocolo?: string;
    nu_seq_solicitacao?: string;
    nu_seq_orgao?: number;
    is_espolio?: boolean;
    dados_evento?: DadoseventoInterface;
    no_cpf?: string;
    nu_seq_usuario?: number;
    ds_nome?: string;
    co_sexo?: string;
    co_tipo_documento?: number;
    nu_documento?: number;
    ds_orgao_emissor?: string;
    co_uf_emissor?: number;
    ds_escolaridade?: string;
    data_nascimento?: string;
    atividade?: Array<AtividadeInterface>;
    questionario?: Array<QuestionarioInterface>;
    baixa?: BaixaInterface;
    imovel?: ImovelInterface;
    contabilista?: ContabilistaInterface;
    anexo?: Array<AnexoInterface>;
    documento_orgao?: Array<DocumentoOrgaoInterface>;
    andamento?: Array<AndamentoInterface>;
}

export interface DadoseventoInterface {
    dt_solicitacao: string;
    co_evento: number;
}

export interface AtividadeInterface {
    co_atividade: string;
    is_atividade_principal: boolean;
    is_exerce_atividade_local: boolean;
}

export interface QuestionarioInterface {
    co_pergunta: number;
    ds_pergunta: string;
    ds_resposta: string;
}

export interface BaixaInterface {
    ds_motivo_baixa: string;
    ds_observacao: string;
}

export interface ImovelInterface {
    nu_inscricao_rural: string;
    nu_car: string;
    nu_ccir: string;
    nu_sigef: string;
    endereco: EnderecoInterface;
    endereco_correspondencia: EnderecoCorrespondenciaInterface;
}

export interface ContabilistaInterface {
    co_cpf_cnpj: string;
    ds_nome: string;
    nu_tipo_pessoa?: number;
    responsavel: ResponsavelInterface;
    conselho: ConselhoInterface;
    endereco: EnderecoContabilistaInterface;
}

export interface AnexoInterface {
    ds_path_anexo: string;
    co_ip: string;
    ds_navegador: string;
    dt_cadastro: string;
    co_tipo_anexo: number;
    ds_descricao: string;
}

export interface DocumentoOrgaoInterface {
    ds_orgao: string;
    ds_documento: string;
    ds_status: string;
}

export interface AndamentoInterface {
    data: string;
    ds_stauts: string;
    ds_descricao: string;
    ds_observacao: string;
    ds_usuario: string;
}

export interface EnderecoInterface {
    co_cep: string;
    co_tipo_logradouro?: number;
    co_tipo_imovel: number;
    ds_endereco: string;
    nu_numero: string;
    ds_complemento?: string;
    ds_bairro: string;
    co_municipio: number;
    co_uf: number;
    ds_ponto_referencia: string;
    nu_area_total: string;
    nu_area_producao: string;
    coordenadas_geograficas?: CoordenadasGeograficasInterface;
    ds_email?: string;
    nu_ddd?: string;
    nu_telefone?: string;
}

export interface EnderecoCorrespondenciaInterface {
    co_cep: string;
    co_tipo_logradouro: number;
    ds_endereco: string;
    nu_numero: string;
    ds_bairro: string;
    ds_complemento?: string;
    co_municipio: number;
    co_uf: number;
    co_telefone?: string;
    ds_email?: string;
    ds_ponto_referencia?: string;
    anexo?: AnexoInterface;
}

export interface ResponsavelInterface {
    nu_cpf?: string;
    ds_nome: string;
    conselho: ConselhoInterface;
}

export interface ConselhoInterface {
    co_uf_crc: number;
    nu_sequencia: number;
    dt_registro: string;
    co_tipo_classificacao_crc: number;
    nu_tipo_crc: number;
    co_digito_verificador: number;
}

export interface EnderecoContabilistaInterface {
    co_cep: string;
    co_tipo_logradouro: number;
    ds_endereco: string;
    nu_numero: string;
    ds_complemento: string;
    ds_bairro: string;
    co_municipio: number;
    co_uf: number;
}

export interface CoordenadasGeograficasInterface {
    latitude: string;
    longitude: string;
}

export interface Atividade {
    principal: string;
    codigo: string;
    descricao: string;
}

export interface AtividadeInterface {
    atividade: Array<AtividadeOcupacaoInterface>;
}

export interface AtividadeOcupacaoInterface {
    co_atividade: string;
    ds_descricao?: string;
    is_atividade_principal: boolean;
    is_exerce_no_endereco: boolean;
}
