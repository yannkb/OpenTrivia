import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OpenTriviaProvider } from '../providers/opentrivia.provider';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	public pseudo: string = '';
    public difficulty: string = '';
    public save: boolean = false;
    public chosenCategory: number = 0;
    public categories = [];
    private db: SQLiteObject;

    constructor(private toastCtrl: ToastController, private router: Router, private openTriviaProvider: OpenTriviaProvider, private sqlite: SQLite) {}
    
    ngOnInit() {
        this.getCategories();
        this.sqlite.create({
            name: 'opentrivia.db',
            location: 'default'
        })
        .then((db: SQLiteObject) => {
            this.db = db;
            db.executeSql('CREATE TABLE user_data(pseudo VARCHAR(15), difficulty VARCHAR(10), category INTEGER)')
                .then(() => console.log('Table userData created'))
                .catch(e => {
                    console.log(e);
                    this.db.executeSql('SELECT * FROM user_data WHERE pseudo = ?', [this.pseudo])
                    .then((result) => {
                        console.log(result);
                    });
                });
        })
        .catch(e => console.log(e));
    }

	public async checkForm() {

		if (!this.pseudo || this.pseudo.length <= 3) {
			const toast = await (this.toastCtrl.create({
				message: 'Veuillez saisir un pseudo de plus de 3 caractères'
			}));
			toast.present();
			return;
		}

		if (this.difficulty === undefined) {
			const toast = await (this.toastCtrl.create({
				message: 'Veuillez sélectionner une difficulté'
			}));
			toast.present();
			return;
        }
        
        if (this.chosenCategory <= 0) {
			const toast = await (this.toastCtrl.create({
				message: 'Veuillez sélectionner une catégorie'
			}));
			toast.present();
			return;
        }

        if (this.save) {
            this.db.executeSql('INSERT INTO user_data(pseudo, difficulty, category) VALUES(?, ?, ?)', [this.pseudo, this.difficulty, this.chosenCategory])
                .then(data => console.log('Successfully inserted: ', data));
        }
        
		this.router.navigate(['/game', this.pseudo, this.difficulty, this.chosenCategory]);
    }
    
    private async getCategories() {
        try {
            this.categories = await this.openTriviaProvider.getCategories();
        } catch (error) {
            const toast = await (this.toastCtrl.create({
				header: 'Erreur système',
				message: error
			}));
			toast.present();
        }
    }

}
