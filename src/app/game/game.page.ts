import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenTriviaProvider } from '../providers/opentrivia.provider';
import { ToastController } from '@ionic/angular';

@Component({
	selector: 'app-game',
	templateUrl: './game.page.html',
	styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
	public pseudo: string;
    public difficulty: string;
    public chosenCategory: number;
	public save: boolean = false;
	public gameOver: boolean = false;
	public questions = [];
	public currentQuestion = [];
	public questionNumber: number = 0;
	public hasAnswered: boolean = false;
	public points: number = 0;

  	constructor(private toastCtrl: ToastController, private route: ActivatedRoute, private router: Router, private openTriviaProvider: OpenTriviaProvider) {
		this.route.params.subscribe((params) => {
			this.pseudo = params['pseudo'];
            this.difficulty = params['difficulty'];
            this.chosenCategory = params['category'];
        });
	}

	ngOnInit() {
		this.getQuestions();
	}

	public checkAnswer(answer: string) {
		this.hasAnswered = true;

		if (answer['correct']) {
			this.points++;
		}

		if (this.questionNumber >= this.questions.length - 1) {
			this.gameOver = true;
		}
	}

	private async getQuestions() {
		this.gameOver = false;
		this.questionNumber = 0;
		this.hasAnswered = false;
		this.points = 0;

		try {
			this.questions = await this.openTriviaProvider.getQuestions(this.difficulty, this.chosenCategory);
		} catch (error) {
			const toast = await (this.toastCtrl.create({
				header: 'Erreur système',
				message: error
			}));
			toast.present();
        }

		this.questions = this.shuffleArray(this.questions);
		this.displayQuestion();
	}

	private displayQuestion() {
		this.currentQuestion = this.questions[this.questionNumber];
		this.currentQuestion['answers'] = [];

		for (let answer of this.currentQuestion['incorrect_answers']) {
			this.currentQuestion['answers'].push({
				correct: false,
				answer: answer
			});
		}

		this.currentQuestion['answers'].push({
			correct: true,
			answer: this.currentQuestion['correct_answer']
		});
		this.currentQuestion['answers'] = this.shuffleArray(this.currentQuestion['answers']);
	}

	public getNextQuestion() {
		if (this.questionNumber < this.questions.length - 1) {
			this.questionNumber++;
			this.hasAnswered = false;
			this.displayQuestion();
		}
	}

	private shuffleArray(array) {
		for(let i = array.length - 1; i > 0; i--){
			const j = Math.floor(Math.random() * (i + 1))
			const temp = array[i]
			array[i] = array[j]
			array[j] = temp
		}

		return array;
	}

	public displayScore() {
		this.router.navigate(['/score', this.points]);
	}

}
