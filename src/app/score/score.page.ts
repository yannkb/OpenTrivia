import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-score',
    templateUrl: './score.page.html',
    styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {
    public score: number;

    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe((params) => {
        this.score = params['score'];
        });
    }

    ngOnInit() {
    }

}
