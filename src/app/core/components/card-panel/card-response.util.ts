/**
 * classe utilitária que trata a resposta recebida pelos cards
 * @dynamic
 * @export
 * @class CardResponse
 */
export class CardResponse {
    /**
     * retorna uma promise com o resultado do tratamento da resposta
     * @static
     * @param {*} response
     * @returns {Promise<any>}
     * @memberof CardResponse
     */
    public static manager(response: any): Promise<any> {
        const arrayVazio = response instanceof Array && !response.length;
        const objetoVazio = response instanceof Object && !Object.keys(response).length;

        return new Promise((resolve, reject) => {
            if (response instanceof Error) {
                reject('erro');
                return;
            }
            if (arrayVazio || objetoVazio) {
                reject('vazio');
                return;
            }
            resolve(response);
        });
    }

    /**
     * retorna um objetos contendo os valores do tipo de erro indicado
     * @static
     * @param {('erro' | 'vazio')} type
     * @returns {{statusClass: string, label: string}}
     * @memberof CardResponse
     */
    public static erroLabel(type: 'erro' | 'vazio'): { statusClass: string; label: string } {
        const result = {
            erro: {
                statusClass: 'danger',
                label: 'Ocorreu um erro na solicitação das informações'
            },
            vazio: {
                statusClass: 'warning',
                label: 'Não existem dados a serem exibidos'
            }
        };
        return result[type];
    }
}
