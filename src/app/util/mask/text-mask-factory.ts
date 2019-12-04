import { Mask } from './mask';
import { CnpjMask } from './cnpj-mask';
import { CpfMask } from './cpf-mask';
import { ProtocoloMask } from './protocolo-mask';
import { NumeroBloqueioMask } from './numero-bloqueio-mask';
import { NumeroOficioMask } from './numero-oficio-mask';

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

    public createNumeroBloqueio(): Mask {
        return new NumeroBloqueioMask();
    }

    public createNumeroOficio(): Mask {
        return new NumeroOficioMask();
    }

}
