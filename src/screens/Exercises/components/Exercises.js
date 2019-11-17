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
import { choiceAlert } from 'common/alerts';
import { ExerciseValidation } from '../validate';
import { QUESTION_TYPE, QUESTION_EXAM } from '../constants';
import Feedback from './Feedback';

class Exercises extends Component {
    constructor(props) {
        super(props);
        this.question = null;
        this.state = {feedback: true}
    }

    componentDidMount() {
        const { dispatch, pagination } = this.props;
        dispatch(listQuestionsSagas(pagination.activePage));
    }

    async __submit(data, form) {
        const { dispatch } = this.props;

        const success = await choiceAlert(
            "Enviando resposta.",
            "Tem certeza que deseja finalizar a lista de exercício? Após finalizar a lista será resetada.",
            "Sim", "Não", "Lista finalizada com sucesso!",
            "", "Operação Cancelada!", ""
        )
        if (success) {
            let result = {};
            result['exam'] = QUESTION_EXAM.EXERCISE;
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
        if (await choiceAlert(
            "Deletar questão",
            `Tem certeza que deseja deletar a questão: ${this.question.title}`,
            "Sim", "Não",
            "Questão deletada", "",
            "Operação cancelada", ""
        )) {
            const { dispatch } = this.props;
            dispatch(deleteQuestionSagas(this.question.id));
        }
    }

    render() {
        const { initialValues, state, questions, pagination } = this.props;
        const discipline = state.discipline;
        const section = state.section;

        const navigator = [
            {title: "Home", url: "/", state: null},
            {title: "Perfil", url: "/profile", state: null},
            {title: discipline.title, url: `/profile/${makeURL(discipline.title)}/detail`, state: { discipline } },
            {title: "Seções", url: `/profile/${makeURL(discipline.title)}/sections`, state: { discipline } },
            {title: section.title, url: `/profile/${makeURL(discipline.title)}/sections/${makeURL(section.title)}/detail`, state },
            {title: "Exercícios", url: `/profile/${makeURL(discipline.title)}/sections/${makeURL(section.title)}/exercises`, state }
        ]

        const progress = parseInt((pagination.activePage * 100)/pagination.totalItemsCount).toString();
        const rightButtons = (
            <RightButtons
                open={this.state.feedback}
                feedbackClick={() => this.__showFeedback()}
                updateClick={() => this.__updateQuestion()}
                deleteClick={() => this.__deleteQuestion()}
            />
        )

      	return (
            <Main navigation={navigator} menu="traditional" title="Lista de exercícios" icon="fa-gamepad" rightComponent={rightButtons}>
                <ProgressBar progress={progress} />

                {questions.length === 0 ? <Info>Não há questões disponíveis nessa lista de exercícios.</Info> : null}
                {questions.map((question, index) => {
                    this.question = question;
                    return (
                        <QuestionPanel key={index} activePage={pagination.activePage} question={question}>
                            <Form
                                onSubmit={(data, form) => this.__submit(data, form)}
                                validate={ExerciseValidation}
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
    const { list, pagination } = state.exercise;

    let initialValues = {};

    return {
        state: location.state,
        questions: list,
        pagination,
        initialValues
    }
}

export default connect(mapStateToProps)(Exercises);