import { Router } from '@angular/router';
import { RotasEnum } from '@core/enums/interno/rotas.enum';

export function navigate(
    routerInstance: Router,
    rotaAlvo: RotasEnum,
    routeParam: string | number = null,
    state: any = null
) {
    const comandos = routeParam ? [].concat(rotaAlvo, routeParam) : [rotaAlvo];
    if (state) {
        void routerInstance.navigate(comandos, { state: state });
        return;
    }
    void routerInstance.navigate(comandos);
}
