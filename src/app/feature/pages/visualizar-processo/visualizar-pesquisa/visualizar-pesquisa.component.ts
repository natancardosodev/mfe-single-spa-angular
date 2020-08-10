import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Status } from 'src/app/core/enums/status.enum';

@Component({
    selector: 'app-visualizar-pesquisa',
    templateUrl: './visualizar-pesquisa.component.html',
    styleUrls: ['./visualizar-pesquisa.component.scss']
})
export class VisualizarPesquisaComponent implements OnInit {
    public loading: boolean;
    public solicitacao: number;
    public isStatusExigencia: boolean;

    constructor(private router: Router, private route: ActivatedRoute) {
        this.loading = true;
        this.isStatusExigencia = false;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return
        this.route.params.subscribe((params) => (this.solicitacao = params['id']));
    }

    ngOnInit(): void {
        window.scrollTo(0, 0);
    }

    public voltarParaPesquisa(): void {
        window.scrollTo(0, 0);
        void this.router.navigate(['']);
    }

    public statusAtualProcesso(status: number): void {
        setTimeout(() => {
            this.isStatusExigencia = status == Status.EXIGENCIA ? true : false;
        }, 500);
    }
}
