import { Component, OnInit } from '@angular/core';
import { IndexI } from '@core/interfaces/mapeamento.interface';
import { SolicitacaoService } from '@feature/services/solicitacao.service';
import { StorageUtil } from 'lib-vox-shared-codes';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public lista$: BehaviorSubject<Array<IndexI>> = new BehaviorSubject(StorageUtil.get('indexDt'));
    public lista: Array<IndexI>;

    constructor(private solicitacaoService: SolicitacaoService) {}

    ngOnInit(): void {
        this.getLista();
    }

    public getLista() {
        this.lista$.subscribe((dataSaved) => {
            if (!dataSaved || !dataSaved.length) {
                this.solicitacaoService.getListEquipes().subscribe((response) => {
                    this.lista = response;
                    this.lista$.next(this.lista);
                    StorageUtil.store('indexDt', this.lista);
                });
                return;
            }
            this.lista = dataSaved;
        });
    }
}
