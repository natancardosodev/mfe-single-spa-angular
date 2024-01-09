import { Component, OnInit } from '@angular/core';
import { SolicitacaoService } from '@feature/services/solicitacao.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public lista;

    constructor(private solicitacaoService: SolicitacaoService) {}

    ngOnInit(): void {
        this.getLista();
    }

    public getLista() {
        this.solicitacaoService.getListEquipes().subscribe((response) => {
            this.lista = response;
        });
    }
}
