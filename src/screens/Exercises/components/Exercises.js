import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Form, Field } from 'react-final-form';
import { VorFQuestion, MultipleChoicesQuestion, ShotQuestion } from 'common/questions';
import { HiddenField } from 'common/fields';
import { makeURL } from 'common/utils';
import { Main, FormStyled, Info, SubmitButton, Pagination, StringToHtml, Line, BreakLine } from 'common';
import { listQuestionsSagas, deleteQuestionSagas } from '../actions';
import { choiceAlert } from 'common/alerts';
import { ExerciseValidation } from '../validate';
import { QUESTION_TYPE } from '../constants';
import Feedback from './Feedback';

class Exercises extends Component {
    constructor(props) {
        super(props);
        this.question = null;
        this.state = {feedback: false}
    }

    componentDidMount() {
        const { dispatch, pagination } = this.props;
        dispatch(listQuestionsSagas(pagination.activePage));
    }

    async __submit(data, form) {
        const success = await choiceAlert(
            "Enviando resposta.",
            "Tem certeza que deseja finalizar a lista de exercício? Após finalizar a lista será resetada.",
            "Sim", "Não", "Lista finalizada com sucesso!",
            "", "Operação Cancelada!", ""
        )
        if (success) {
            console.log(data);
            setTimeout(form.reset);
            window.location.reload();
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
            <div className="btn-group pull-right">
                <button type="button" className="btn btn-primary" onClick={() => this.__showFeedback()}>
                    {this.state.feedback ? "Esconder Feedbacks" : "Mostrar Feedbacks"}
                </button>
                <button type="button" className="btn btn-primary" onClick={() => this.__updateQuestion()}>Atualizar</button>
                <button type="button" className="btn btn-danger" onClick={() => this.__deleteQuestion()}>Deletar</button>
            </div>
        )

      	return (
            <Main navigation={navigator} menu="traditional" title="Lista de exercícios" icon="fa-gamepad" rightComponent={rightButtons}>
                <div className="progress">
                    <div
                        className="progress-bar progress-bar-striped active"
                        role="progressbar" aria-valuenow={progress} aria-valuemin="0"
                        aria-valuemax="100" style={{"width": `${progress}%`}}>
                        {progress}%
                    </div>
                </div>

                {questions.length === 0 ? <Info>Não há questões disponíveis nessa lista de exercícios.</Info> : null}
                {questions.map((question, index) => {
                    this.question = question;
                    return (
                        <div className="panel panel-default" key={index}>
                            <div className="panel-body">
                                <h2>{pagination.activePage}) {question.title}</h2>
                                {question.description ? <StringToHtml>{question.description}</StringToHtml> : null}
                                <Line />
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
                                            <Feedback values={values} question={question} open={this.state.feedback} />
                                        </FormStyled>
                                    )}
                                />
                            </div>
                        </div>
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