import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OpenTriviaProvider {

    constructor(private http: HttpClient) {}

    async getQuestions(difficulty: string, category: number): Promise<Array<Object>> {
        const response = await this.http.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`).toPromise();
        if (response && response['results']) {
            return response['results'];   
        } else {
            throw new Error('Impossible de récupérer la liste de questions');
        }
    }

    async getCategories(): Promise<Array<Object>> {
        const response = await this.http.get(`https://opentdb.com/api_category.php`).toPromise();
        if (response && response['trivia_categories']) {
            return response['trivia_categories'];   
        } else {
            throw new Error('Impossible de récupérer la liste de catégories');
        }
    }

}