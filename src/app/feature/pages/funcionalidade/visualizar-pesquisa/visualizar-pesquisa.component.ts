import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { VisualizarPesquisaService } from 'src/app/services/funcionalidade/visualizar-pesquisa.service';
import { Card } from 'src/app/core/interfaces/cards.interface';
import { AlertMessage } from '../../../../core/utils/alert-message';

@Component({
    selector: 'app-visualizar-pesquisa',
    templateUrl: './visualizar-pesquisa.component.html',
    styleUrls: ['./visualizar-pesquisa.component.scss']
})
export class VisualizarPesquisaComponent implements OnInit {
    private $cards: Array<Card>;

    constructor(
        private router: Router,
        private visualizarPesquisaService: VisualizarPesquisaService,
        private alertMessage: AlertMessage
    ) {
        this.$cards = [];
    }

    ngOnInit(): void {
        window.scrollTo(0, 0);
        this.popularCards();
    }

    public get cards(): Array<Card> {
        return this.$cards;
    }

    public popularCards(): void {
        this.visualizarPesquisaService.getCards('1').subscribe(
            (response) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                this.$cards = response.cards;
            },
            (erro) => {
                this.alertMessage.alert(erro, 'danger');
            }
        );
    }

    public voltarParaPesquisa(): void {
        window.scrollTo(0, 0);
        void this.router.navigate(['']);
    }
}
