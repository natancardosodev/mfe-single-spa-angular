export enum FormFieldGridPesquisa {
    protocolo = 'protocolo',
    cpf = 'cpf',
    tipo = 'tipo',
    statusProcesso = 'statusProcesso',
    dataInicial = 'dataInicial',
    dataFinal = 'dataFinal'
}

export const FormLabelGridPesquisa = {
    [FormFieldGridPesquisa.protocolo]: 'Protocolo',
    [FormFieldGridPesquisa.cpf]: 'CPF',
    [FormFieldGridPesquisa.tipo]: 'Tipo',
    [FormFieldGridPesquisa.statusProcesso]: 'Status',
    [FormFieldGridPesquisa.dataInicial]: 'Data inicial',
    [FormFieldGridPesquisa.dataFinal]: 'Data final'
};
