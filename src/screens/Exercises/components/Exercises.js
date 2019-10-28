import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { VorFQuestion, MultipleChoicesQuestion } from 'common/questions';
import { makeURL } from 'common/utils';
import { Main, FormStyled, Info, SubmitButton, Pagination, StringToHtml, Line } from 'common';
import { listQuestionsSagas } from '../actions';
import { MULTIPLE_CHOICES, SHOT, SCRATCH_CARD } from '../constants';

class Exercises extends Component {

    componentDidMount() {
        const { dispatch, pagination } = this.props;
        dispatch(listQuestionsSagas(pagination.activePage));
    }

    __submit(data) {
        console.log(data);
    }

    __getQuestionType(question) {
        switch(question.question_type) {
            case MULTIPLE_CHOICES:
                return (
                    question.alternatives.map(alternative => (
                        <div key={alternative.id}>
                            <Field
                                component={MultipleChoicesQuestion}
                                type="radio"
                                label={alternative.title}
                                id={alternative.id}
                                value={alternative.is_correct.toString()}
                                name={`answer_${question.id}`}
                            />
                        </div>
                    ))
                );

            case SHOT:
                return (
                    <div>SHOT</div>
                )

            case SCRATCH_CARD:
                return (<div>SCRATCH_CARD</div>);

            default:
                return (
                    question.alternatives.map(alternative => (
                        <Field
                            key={alternative.id}
                            component={VorFQuestion}
                            type="checkbox"
                            name={`correct_answer_${alternative.id}`}
                            id={alternative.id}
                            label={alternative.title}
                        />
                    ))
                )
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

        const progress = (pagination.activePage * 100)/pagination.totalItemsCount;

      	return (
            <Main navigation={navigator} menu="traditional" title="Lista de exercícios" icon="fa-gamepad">
                <div className="progress">
                    <div
                        className="progress-bar progress-bar-striped active"
                        role="progressbar" aria-valuenow={progress.toString()} aria-valuemin="0"
                        aria-valuemax="100" style={{"width": `${parseInt(progress).toString()}%`}}>
                        {parseInt(progress).toString()}%
                    </div>
                </div>

                {questions.length === 0 ? <Info>Não há questões disponíveis nessa lista de exercícios.</Info> : null}
                {questions.map((question, index) => (
                    <div className="panel panel-default" key={index}>
                        <div className="panel-body">
                            <h2>{pagination.activePage}) {question.title}</h2>
                            {question.description ? <StringToHtml>{question.description}</StringToHtml> : null}
                            <Line />
                            <Form
                                onSubmit={(data, form) => this.__submit(data, form)}
                                initialValues={initialValues}
                                render={({handleSubmit, submitting, invalid}) => (
                                    <FormStyled onSubmit={handleSubmit}>
                                        {this.__getQuestionType(question)}

                                        <Line />
                                        <SubmitButton disabled={submitting || invalid}>Enviar</SubmitButton>
                                    </FormStyled>
                                )}
                            />
                        </div>
                    </div>
                ))}
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