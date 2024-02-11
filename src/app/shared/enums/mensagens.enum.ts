export enum MensagensEnum {
    CAMPO_OBRIGATORIO = 'O campo %s é obrigatório.',
    CAMPOS_OBRIGATORIOS = 'Preencha os campos obrigatórios',
    VALOR_INVALIDO = 'O valor informado no campo %s é inválido',
    CPF_INVALIDO = 'O CPF deve possuir 11 caracteres.',
    DATA_INVALIDA = 'A data informada é inválida.',
    EMAIL_INVALIDO = 'O email informado é inválido.',
    UF_NAO_LIBERADA = 'A UF atual não está liberada para esta aplicação.',
    SEM_PROCESSO = 'Prezado usuário, não identificamos um processo em andamento.',
    API_FORA = 'Nossa aplicação está fora do ar ou você foi deslogado. Favor atualize sua página ou tente mais tarde.'
}

export enum ErroFormsEnum {
    CAMPO_OBRIGATORIO = 'required',
    DATA_INVALIDA = 'bsDate',
    QNT_INVALIDA = 'quantidadeInvalida',
    VALOR_INVALIDO = 'valorInvalido',
    TAM_MINIMO = 'minlength',
    TAM_MAXIMO = 'maxlength'
}
