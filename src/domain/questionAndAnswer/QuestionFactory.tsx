import questionsJSON from '../../data/questions.json';
import { Question } from "./Question";
import { Answer } from "./Answer";

export class QuestionFactory {
    private _questionList!: Question[];
    private _index!: number;
    
    constructor() {
        this.initQuestionList();
    }

    private initQuestionList() {
        let questions: Question[] = [];
        questionsJSON.map((data) => {
            questions.push(
                new Question(data.question, [
                    new Answer(data.answers[0].answer, data.answers[0].correct),
                    new Answer(data.answers[1].answer, data.answers[1].correct),
                    new Answer(data.answers[2].answer, data.answers[2].correct),
                    new Answer(data.answers[3].answer, data.answers[3].correct)
                ]
            ))
        });
        
        this._index = -1;
        this._questionList = questions;

        this.shuffleQuestionListAndItsAnswers();
    }

    private shuffleQuestionListAndItsAnswers() {
        for (let i = this._questionList.length - 1; i > 0; i--) {
            this._questionList[i].shuffleAnswers();
            const j = Math.floor(Math.random() * (i + 1));
            [this._questionList[i], this._questionList[j]] = [this._questionList[j], this._questionList[i]];
        }
    } 

    public getNextQuestion(): Question {
        this._index++;
        if (this._index === this._questionList.length) {
            this.shuffleQuestionListAndItsAnswers();
            this._index = 0;
        }
        return this._questionList[this._index];
    }

    get index(): number {
        return this._index + 1;
    }

    get size(): number {
        return this._questionList.length;
    }
}