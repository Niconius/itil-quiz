import React from 'react';
import { QuestionFactory } from '../../domain/questionAndAnswer/QuestionFactory';
import { Question } from '../../domain/questionAndAnswer/Question';
import './app.css';

interface IProps { }

interface IState {
    darkMode: boolean;
    questionFactory: QuestionFactory;
    questionNumber: number;
    question: Question;
    answerStyles: string[],
};

export default class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const questionFactory = new QuestionFactory();
        const question = questionFactory.getNextQuestion();
        const questionNumber = questionFactory.index;

        this.state = {
            darkMode: false,
            questionFactory: questionFactory,
            questionNumber: questionNumber,
            question: question,
            answerStyles: ["answer", "answer", "answer", "answer"],
        }
    }

    nextQuestion = () => {
        const newQuestion = this.state.questionFactory.getNextQuestion();
        const newIndex = this.state.questionFactory.index;

        this.setState({
            question: newQuestion,
            questionNumber: newIndex,
            answerStyles: ["answer", "answer", "answer", "answer"],
        });
    };

    checkAnswer = () => {
        let styles = this.state.answerStyles;
        for (let i = 0; i < 4; i++) {
            if (this.state.question.correctAnswer.answer === this.state.question.answers[i].answer) {
                styles[i] += " correctAnswer";
                this.setState({answerStyles: styles});
            }
        }
    };

    toggleTheme = () => {
        this.setState({darkMode: !this.state.darkMode});
    };

    render() {
        const darkModeClass = this.state.darkMode ? "dark" : "light";

        return (
            <div id="rootContainer" className={darkModeClass}>
                <div id="headerContainer">
                    <p>ITIL 4 Quiz</p>
                </div>
                <div id="mainContainer">
                    <div id="questionBlock">
                        <p id="question">{this.state.question.question}</p>
                        <p className={this.state.answerStyles[0]}>A: {this.state.question.answers[0].answer}</p>
                        <p className={this.state.answerStyles[1]}>B: {this.state.question.answers[1].answer}</p>
                        <p className={this.state.answerStyles[2]}>C: {this.state.question.answers[2].answer}</p>
                        <p className={this.state.answerStyles[3]}>D: {this.state.question.answers[3].answer}</p>
                        <div id="questionBottom">
                            <p id="questionNumber">Frage {this.state.questionNumber} von {this.state.questionFactory.size}</p>
                            <div id="buttonContainer">
                                <button id="solutionButton" onClick={this.checkAnswer}>Überprüfe Lösung</button>
                                <button id="nextButton" onClick={this.nextQuestion}>Nächste Frage</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="themeSwitchWrapper">
                            <label className="themeSwitch" htmlFor="darkModeCheckbox">
                                <input type="checkbox" id="darkModeCheckbox" onChange={this.toggleTheme}/>
                                <div className="slider round"></div>
                            </label>
                            <em>Dark Mode {this.state.darkMode ? "an" : "aus"}</em>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
