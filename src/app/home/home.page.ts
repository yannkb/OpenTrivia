import { Component } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	public pseudo = '';
	public difficulty = '';
	public error = '';
	public isOk = false;
	public hasAnswered = false;

	constructor() {}

	public checkForm() {
		this.error = '';

		if (!this.pseudo || this.pseudo.length <= 3) {
		this.error = 'Veuillez saisir un pseudo de plus de 3 caractères';
		return;
		}
		if (this.difficulty === undefined) {
		this.error = 'Veuillez sélectionner une difficulté';
		return;
		}

		this.isOk = true;
	}

	public checkAnswer() {
		this.hasAnswered = true;
	}

}
