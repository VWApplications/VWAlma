import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { ShotField, CheckboxField, RadioFields } from 'common/fields';
import { makeURL } from 'common/utils';
import { Main, Form, Info, SubmitButton, Pagination, StringToHtml, Line } from 'common';
import { listQuestionsSagas } from '../actions';
import { MULTIPLE_CHOICES, SHOT, SCRATCH_CARD, V_OR_F } from '../constants';

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
                    <RadioFields
                        name="answer"
                        question={true}
                        inputs={[
                            {title: question.alternative_A, value: "A"},
                            {title: question.alternative_B, value: "B"},
                            {title: question.alternative_C, value: "C"},
                            {title: question.alternative_D, value: "D"},
                        ]}
                    />
                );

            case SHOT:
                return (
                    <div>
                        <Field
                            component={ShotField}
                            name="shot_A"
                            type="number"
                            className="form-control"
                            placeholder="Aposta A"
                            description={question.alternative_A}
                        />
                        <Field
                            component={ShotField}
                            name="shot_B"
                            type="number"
                            className="form-control"
                            placeholder="Aposta B"
                            description={question.alternative_B}
                        />
                        <Field
                            component={ShotField}
                            name="shot_C"
                            type="number"
                            className="form-control"
                            placeholder="Aposta C"
                            description={question.alternative_C}
                        />
                        <Field
                            component={ShotField}
                            name="shot_D"
                            type="number"
                            className="form-control"
                            placeholder="Aposta D"
                            description={question.alternative_D}
                        />
                    </div>
                )

            case SCRATCH_CARD:
                return (<p>dd</p>);

            default:
                return (
                    <Field
                        component={CheckboxField}
                        name="correct_answer"
                        id={question.id}
                        question={true}
                        label={<StringToHtml>{question.description}</StringToHtml>}
                    />
                )
        }
    }

    render() {
        const { handleSubmit, submitting, invalid, state, questions, pagination } = this.props;
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
                        aria-valuemax="100" style={{"width": `${progress.toString()}%`}}>
                        {progress.toString()}%
                    </div>
                </div>

                {questions.length === 0 ? <Info>Não há questões disponíveis nessa lista de exercícios.</Info> : null}
                {questions.map((question, index) => (
                    <div className="panel panel-default" key={index}>
                        <div className="panel-body">
                            <h2>{pagination.activePage}) {question.title}</h2>
                            {question.question_type !== V_OR_F ? <StringToHtml>{question.description}</StringToHtml> : null}
                            <Line />
                            <Form onSubmit={handleSubmit((data) => this.__submit(data))}>
                                {this.__getQuestionType(question)}

                                <Line />
                                <SubmitButton disabled={submitting || invalid}>Enviar</SubmitButton>
                            </Form>  
                        </div>
                    </div>
                ))}
                <Pagination pagination={pagination} listObjectAction={listQuestionsSagas} />
            </Main>
		)
  	}
}

const form = reduxForm({
    form: "ExerciseForm",
    // validate: validateQuestionForm,
    enableReinitialize: true
})(Exercises);

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

export default connect(mapStateToProps)(form);