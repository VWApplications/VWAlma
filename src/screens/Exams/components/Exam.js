import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Form, Field } from 'react-final-form';
import { VorFQuestion, MultipleChoicesQuestion, ShotQuestion } from 'common/questions';
import { HiddenField } from 'common/fields';
import { makeURL } from 'common/utils';
import { Main, FormStyled, Info, SubmitButton, Pagination, Line, ProgressBar, BreakLine } from 'common';
import { listQuestionsSagas, deleteQuestionSagas, submitExamSagas } from '../actions';
import { QuestionPanel, RightButtons } from '../styles/exercise';
import { requestChoiceAlert } from 'common/alerts';
import { ExamValidation } from '../validate';
import { QUESTION_TYPE, QUESTION_EXAM } from '../constants';
import Feedback from './Feedback';

class Exam extends Component {
    constructor(props) {
        super(props);
        this.question = null;
        this.exam = false;
        this.state = {feedback: true}
    }

    componentDidMount() {
        const { dispatch, pagination, location } = this.props;

        if (location.pathname.endsWith("exam")) {
            this.exam = true;
            dispatch(listQuestionsSagas(pagination.activePage, null, true));
        } else {
            dispatch(listQuestionsSagas(pagination.activePage));
        }
    }

    async __submit(data, form) {
        const { dispatch, state } = this.props;
        let txt = "Tem certeza que deseja finalizar a lista de exercício?";
        let exam = QUESTION_EXAM.EXERCISE;
        if (this.exam) {
            txt = "Tem certeza que deseja finalizar a avaliação?";
            switch(state.section.methodology) {
                case QUESTION_EXAM.TBL:
                    exam = QUESTION_EXAM.TBL;
                    break;

                case QUESTION_EXAM.TRADITIONAL:
                    exam = QUESTION_EXAM.TRADITIONAL;
                    break;

                default:
                    txt = "Tem certeza que deseja finalizar a lista de exercício?";
            }
        }

        const success = await requestChoiceAlert(
            "Enviando resposta.",
            txt, "Sim", "Não",
            "Operação Cancelada!", ""
        )
        if (success) {
            let result = {};
            result['exam'] = exam;
            result['answers'] = data;
            dispatch(submitExamSagas(result, form));
        }
    }

    __getQuestionType(question, errors) {
        switch(question.question) {
            case QUESTION_TYPE.MULTIPLE_CHOICES:
                return (
                    question.alternatives.map(alternative => (
                        <Field
                            key={alternative.id}
                            component={MultipleChoicesQuestion}
                            type="radio"
                            label={alternative.title}
                            id={alternative.id}
                            value={alternative.id}
                            name={`multiple_choices.Q${question.id}`}
                        />
                    ))
                );

            case QUESTION_TYPE.SHOT:
                return (
                    question.alternatives.map(alternative => (
                        <Field
                            key={alternative.id}
                            component={ShotQuestion}
                            type="number"
                            description={alternative.title}
                            placeholder="Aposta 0-4"
                            error={errors[alternative.id] ? errors[alternative.id] : undefined}
                            name={`shots.Q${question.id}.A${alternative.id}`}
                        />
                    ))
                )

            default:
                return (
                    question.alternatives.map(alternative => (
                        <Field
                            key={alternative.id}
                            component={VorFQuestion}
                            type="checkbox"
                            name={`VorF.Q${question.id}.A${alternative.id}`}
                            id={alternative.id}
                            label={alternative.title}
                        />
                    ))
                )
        }
    }

    __showFeedback() {
        this.setState({ feedback: !this.state.feedback });
    }

    __updateQuestion() {
        const { dispatch, location } = this.props;
        dispatch(push(
            `/profile/${makeURL(location.state.discipline.title)}/sections/${makeURL(location.state.section.title)}/questions`,
            { discipline: location.state.discipline, section: location.state.section, form: this.question }
        ))
    }

    async __deleteQuestion() {
        if (await requestChoiceAlert(
            "Deletar questão",
            `Tem certeza que deseja deletar a questão: ${this.question.title}`,
            "Sim", "Não", "Operação cancelada", ""
        )) {
            const { dispatch } = this.props;
            dispatch(deleteQuestionSagas(this.question.id));
        }
    }

    render() {
        const { initialValues, state, questions, pagination, user } = this.props;
        const discipline = state.discipline;
        const section = state.section;

        let url = "exercises";
        if (this.exam) url = "exam";

        const navigator = [
            {title: "Home", url: "/", state: null},
            {title: "Perfil", url: "/profile", state: null},
            {title: discipline.title, url: `/profile/${makeURL(discipline.title)}/detail`, state: { discipline } },
            {title: "Seções", url: `/profile/${makeURL(discipline.title)}/sections`, state: { discipline } },
            {title: section.title, url: `/profile/${makeURL(discipline.title)}/sections/${makeURL(section.title)}/detail`, state },
            {title: "Exercícios", url: `/profile/${makeURL(discipline.title)}/sections/${makeURL(section.title)}/${url}`, state }
        ]

        const progress = parseInt((pagination.activePage * 100)/pagination.totalItemsCount).toString();
        const rightButtons = (
            <RightButtons
                user={user}
                open={this.state.feedback}
                feedbackClick={() => this.__showFeedback()}
                updateClick={() => this.__updateQuestion()}
                deleteClick={() => this.__deleteQuestion()}
            />
        )

        let title = "Lista de exercícios";
        let icon = "fa-gamepad";
        if (this.exam) {
            title = "Avaliação";
            icon = "fa-street-view";
        }

        let menu = "traditional";
        switch(section.methodology) {
            case QUESTION_EXAM.TBL:
                menu = "tbl";
                break;
            default:
                break;
        }

      	return (
            <Main navigation={navigator} menu={menu} title={title} icon={icon} rightComponent={rightButtons}>
                <ProgressBar progress={progress} />

                {questions.length === 0 ? <Info>Não há questões disponíveis nessa {this.exam ? "avaliação" : "lista de exercícios"}.</Info> : null}
                {questions.map((question, index) => {
                    this.question = question;
                    return (
                        <QuestionPanel key={index} activePage={pagination.activePage} question={question}>
                            <Form
                                onSubmit={(data, form) => this.__submit(data, form)}
                                validate={ExamValidation}
                                initialValues={initialValues}
                                render={({handleSubmit, submitting, values, invalid, errors}) => (
                                    <FormStyled onSubmit={handleSubmit}>
                                        {this.__getQuestionType(question, errors)}
                                        <Field component={HiddenField} name="error" type="text" />

                                        <Line />
                                        {progress === "100" ? <SubmitButton disabled={submitting || invalid}>Enviar</SubmitButton> : null}
                                        {progress === "100" ? <BreakLine /> : null}
                                        <Feedback values={values} question={question} open={this.state.feedback} />
                                    </FormStyled>
                                )}
                            />
                        </QuestionPanel>
                    )
                })}
                <Pagination pagination={pagination} listObjectAction={listQuestionsSagas} />
            </Main>
		)
  	}
}

const mapStateToProps = state => {
    const { location } = state.router;
    const { user } = state.account;
    const { list, pagination } = state.exercise;

    let initialValues = {};

    return {
        state: location.state,
        location,
        user,
        questions: list,
        pagination,
        initialValues
    }
}

export default connect(mapStateToProps)(Exam);