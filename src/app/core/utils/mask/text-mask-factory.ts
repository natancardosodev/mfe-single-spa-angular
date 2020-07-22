import { Mask } from './mask';
import { CnpjMask } from './cnpj-mask';
import { CpfMask } from './cpf-mask';
import { ProtocoloMask } from './protocolo-mask';
import { DddMask } from './ddd-mask';
import { TelefoneMask } from './telefone-mask';
import { CelularMask } from './celular-mask';
import { CepMask } from './cep-mask';
import { AtividadeMask } from './atividade-mask';
import { NireMask } from './nire.mask';

export class TextMaskFactory {
    public createCpf(): Mask {
        return new CpfMask();
    }

    public createCnpj(): Mask {
        return new CnpjMask();
    }

    public createProtocolo(): Mask {
        return new ProtocoloMask();
    }

    public createDdd(): Mask {
        return new DddMask();
    }

    public createTelefone(): Mask {
        return new TelefoneMask();
    }

    public createCelular(): Mask {
        return new CelularMask();
    }

    public createCep(): Mask {
        return new CepMask();
    }

    public createAtividade(): Mask {
        return new AtividadeMask();
    }

    public createNire(): Mask {
        return new NireMask();
    }
}
