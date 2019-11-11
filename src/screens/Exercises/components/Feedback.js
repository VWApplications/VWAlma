import React, { Component } from 'react';
import { connect } from 'react-redux';
import { QUESTION_TYPE } from '../constants';

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.ids = [];
        this.questions = [];
    }

    __renderShotAlternatives(alternatives) {
        let htmlAlternatives = [];
        for (let alternative of alternatives) {
            if (alternative.answer) {
                htmlAlternatives.push(
                    <li key={alternative.id}>
                        <span className="label label-primary">
                            {alternative.answer}
                        </span> {alternative.title}
                    </li>
                )
            }
        }

        return htmlAlternatives;
    }

    __renderVorFAlternatives(alternatives) {
        let htmlAlternatives = [];
        for (let alternative of alternatives) {
            if (alternative.answer !== undefined) {
                htmlAlternatives.push(
                    <li key={alternative.id}>
                        <span className="label label-primary">
                            {alternative.answer === true ? "V" : "F"}
                        </span> {alternative.title}
                    </li>
                )
            }
        }

        return htmlAlternatives;
    }

    __getSelectedAlternative(question) {
        let htmlAlternatives = [];
        for (let alternative of question.alternatives) {
            if (alternative.id === parseInt(question.answer)) {
                htmlAlternatives.push(<li key={alternative.id}>{alternative.title}</li>)
            }
        }

        return htmlAlternatives
    }

    __renderQuestions() {
        const { values, question } = this.props;

        if (values.hasOwnProperty("shots")) {
            for (let [questionName, value] of Object.entries(values.shots)) {
                if (parseInt(questionName.slice(1)) === question.id) {
                    for (let alternative of question.alternatives) {
                        for (let [key, answer] of Object.entries(value)) {
                            if (parseInt(key.slice(1)) === alternative.id)
                                alternative.answer = answer;
                        }
                    }
                }
            }
        }

        if (values.hasOwnProperty("VorF")) {
            for (let [questionName, value] of Object.entries(values.VorF)) {
                if (parseInt(questionName.slice(1)) === question.id) {
                    for (let alternative of question.alternatives) {
                        for (let [key, answer] of Object.entries(value)) {
                            if (parseInt(key.slice(1)) === alternative.id)
                                alternative.answer = answer;
                        }
                    }
                }
            }
        }

        if (values.hasOwnProperty("multiple_choices")) {
            for (let [questionName, value] of Object.entries(values.multiple_choices)) {
                if (parseInt(questionName.slice(1)) === question.id)
                    question.answer = value;
            }
        }

        let alternatives = this.__renderShotAlternatives(question.alternatives);
        if (question.question === QUESTION_TYPE.MULTIPLE_CHOICES)
            alternatives = this.__getSelectedAlternative(question);
        else if (question.question === QUESTION_TYPE.V_OR_F)
            alternatives = this.__renderVorFAlternatives(question.alternatives);

        if (this.ids.indexOf(question.id) === -1) {
            this.ids.push(question.id);
            this.questions.push({
                id: question.id,
                html: (
                    <tr key={question.id}>
                        <td>{question.question}</td>
                        <td>{question.title}</td>
                        <td><ul>{alternatives}</ul></td>
                    </tr>
                )
            })
        } else {
            for (let i = 0; i < this.questions.length; i++) {
                if (this.questions[i].id === question.id)
                    this.questions.splice(i, 1);
            }

            this.questions.push({
                id: question.id,
                html: (
                    <tr key={question.id}>
                        <td>{question.question}</td>
                        <td>{question.title}</td>
                        <td><ul>{alternatives}</ul></td>
                    </tr>
                )
            })
        }
    }

    render() {
        this.__renderQuestions();

        if (this.props.open) {
            return (
                <div className="panel panel-default">
                    <div className="panel-body">
                        <h3>Feedback</h3>
                        <hr />
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Tipo de questão</th>
                                    <th>Título da Questão</th>
                                    <th>Resposta</th>
                                </tr>
                            </thead>
                            <tbody className="text-justify">
                                {this.questions.map(question => question.html)}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }

        return null;
    }
}

const mapStateToProps = state => {
    const { location } = state.router;
    const { user } = state.account;

    return { state: location.state, account: user }
}

export default connect(mapStateToProps)(Feedback);