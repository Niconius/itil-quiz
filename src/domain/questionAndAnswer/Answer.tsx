export class Answer {
    private _answer: string;
    private _correct: boolean;
    
    constructor(answer: string, correct: boolean) {
        this._answer = answer;
        this._correct = correct;
    }

    get answer(): string {
        return this._answer;
    }

    get correct(): boolean {
        return this._correct;
    }
}