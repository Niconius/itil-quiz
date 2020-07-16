import { Answer } from "./Answer";

export class Question {
    private _question: string;
    private _answers: Answer[];
    private _correctAnswer: Answer;

    constructor(question: string, answers: Answer[]) {
        this._question = question;
        this._answers = answers
        this._correctAnswer = this.findCorrectAnswer();
    }

    private findCorrectAnswer(): Answer {
        let correctAnswer = null as any;
        this._answers.forEach(answer => {
            if (answer.correct) {
                correctAnswer = answer;
            }
        });
        return correctAnswer;
    }

    public shuffleAnswers() {
        for (let i = this._answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this._answers[i], this._answers[j]] = [this._answers[j], this._answers[i]];
        }
    }

    get question(): string {
        return this._question;
    }

    get answers(): Answer[] {
        return this._answers;
    }

    get correctAnswer(): Answer {
        return this._correctAnswer;
    }
}