import React, { Component } from 'react';
import { connect } from 'react-redux';
import { QUESTION_TYPE } from '../constants';
import { FeedbackTable, TableBody, TableAlternatives } from '../styles/feedback';

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.ids = [];
        this.questions = [];
    }

    __renderShotAlternatives(alternatives) {
        let htmlAlternatives = [];
        for (let alternative of alternatives) {
            if (alternative.answer)
                htmlAlternatives.push(<TableAlternatives key={alternative.id} alternative={alternative} type={QUESTION_TYPE.SHOT} />)
        }

        return htmlAlternatives;
    }

    __renderVorFAlternatives(alternatives) {
        let htmlAlternatives = [];
        for (let alternative of alternatives) {
            if (alternative.answer !== undefined)
                htmlAlternatives.push(<TableAlternatives key={alternative.id} alternative={alternative} type={QUESTION_TYPE.V_OR_F} />)
        }

        return htmlAlternatives;
    }

    __getSelectedAlternative(question) {
        let htmlAlternatives = [];
        for (let alternative of question.alternatives) {
            if (alternative.id === parseInt(question.answer))
                htmlAlternatives.push(<TableAlternatives key={alternative.id} alternative={alternative} />)
        }

        return htmlAlternatives
    }

    __populateAlternativeAnswer(questionName, question, value) {
        if (parseInt(questionName.slice(1)) === question.id) {
            for (let alternative of question.alternatives) {
                for (let [key, answer] of Object.entries(value)) {
                    if (parseInt(key.slice(1)) === alternative.id)
                        alternative.answer = answer;
                }
            }
        }
    }

    __renderQuestions() {
        const { values, question } = this.props;

        if (values.hasOwnProperty("shots")) {
            for (let [questionName, value] of Object.entries(values.shots))
                this.__populateAlternativeAnswer(questionName, question, value);
        }

        if (values.hasOwnProperty("VorF")) {
            for (let [questionName, value] of Object.entries(values.VorF))
                this.__populateAlternativeAnswer(questionName, question, value);
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
            this.questions.unshift({id: question.id, html: <TableBody key={question.id} question={question} alternatives={alternatives} />})
        } else {
            for (let i = 0; i < this.questions.length; i++) {
                if (this.questions[i].id === question.id)
                    this.questions.splice(i, 1);
            }

            this.questions.unshift({id: question.id, html: <TableBody key={question.id} question={question} alternatives={alternatives} />})
        }
    }

    render() {
        this.__renderQuestions();

        if (this.props.open)
            return <FeedbackTable>{this.questions.map(question => question.html)}</FeedbackTable>

        return null;
    }
}

const mapStateToProps = state => {
    const { location } = state.router;
    const { user } = state.account;

    return { state: location.state, account: user }
}

export default connect(mapStateToProps)(Feedback);