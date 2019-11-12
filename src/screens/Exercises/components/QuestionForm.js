import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { InputField, EditorField, RadioFields, SelectField, AlternativeField } from 'common/fields';
import { VorFQuestion } from 'common/questions';
import { makeURL } from 'common/utils';
import { Main, FormStyled, Fieldset, FormSubmitButtons } from 'common';
import { FormGroup, FormItem } from '../styles/questionForm';
import { validateQuestionForm } from '../validate';
import { createQuestionSagas, updateQuestionSagas } from '../actions';
import { choiceAlert } from 'common/alerts';
import { QUESTION_TYPE, QUESTION_EXAM } from '../constants';

class QuestionForm extends Component {
    constructor(props) {
        super(props);
        this.title = "Criar questão";
    }

    __submit(data, form) {
        const { dispatch, obj } = this.props;

        if (obj)
            dispatch(updateQuestionSagas(data, obj.id));
        else
            dispatch(createQuestionSagas(data));

        setTimeout(form.reset);
    }

    async __removeField(fields, index) {
        const success = await choiceAlert(
            "Removendo alternativa",
            "Tem certeza que deseja remover a alternativa?",
            "Sim", "Não", "Alternativa removida com sucesso!",
            "", "Operação Cancelada!", ""
        )
        if (success)
            fields.remove(index);
    }

    __getQuestionTypeOptions() {
        const { state } = this.props;
        const section = state.section;

        switch(section.methodology) {
            case QUESTION_EXAM.TBL:
                return [{title: "Apostas", value: QUESTION_TYPE.TBL}];
            default:
                return [
                    {title: "Multipla Escolha", value: QUESTION_TYPE.MULTIPLE_CHOICES},
                    {title: "V ou F", value: QUESTION_TYPE.V_OR_F},
                    {title: "Apostas", value: QUESTION_TYPE.SHOT}
                ];
        }
    }

    __getQuestionExamOptions() {
        const { state } = this.props;
        const section = state.section;

        switch(section.methodology) {
            case QUESTION_EXAM.TBL:
                return [
                    {label: "Exercício", value: QUESTION_EXAM.EXERCISE},
                    {label: "Avaliação", value: QUESTION_EXAM.TBL}
                ]
            default:
                return [
                    {label: "Exercício", value: QUESTION_EXAM.EXERCISE},
                    {label: "Avaliação", value: QUESTION_EXAM.TRADITIONAL}
                ];
        }
    }

    render() {
        const { state, obj, initialValues } = this.props;
        const discipline = state.discipline;
        const section = state.section;

        if (obj) this.title = "Editar questão";

        const navigator = [
            {title: "Home", url: "/", state: null},
            {title: "Perfil", url: "/profile", state: null},
            {title: discipline.title, url: `/profile/${makeURL(discipline.title)}/detail`, state: { discipline } },
            {title: "Seções", url: `/profile/${makeURL(discipline.title)}/sections`, state: { discipline } },
            {title: section.title, url: `/profile/${makeURL(discipline.title)}/sections/${makeURL(section.title)}/detail`, state },
            {title: "Questões", url: `/profile/${makeURL(discipline.title)}/sections/${makeURL(section.title)}/questions`, state }
        ]

      	return (
            <Main navigation={navigator} menu="traditional" title={this.title} icon="fa-clipboard">
                <Form
                    onSubmit={(data, form) => this.__submit(data, form)}
                    mutators={{...arrayMutators}}
                    initialValues={initialValues}
                    validate={validateQuestionForm}
                    render={({handleSubmit, form, submitting, invalid}) => (
                        <FormStyled onSubmit={handleSubmit}>
                            <Field
                                component={InputField}
                                type="text"
                                label="Título"
                                labelClass="label-size"
                                className="form-control"
                                name="title"
                                placeholder="Título da questão."
                            />

                            <Field
                                component={EditorField}
                                name="description"
                                placeholder="Insira a descrição da questão aqui!"
                            />

                            <Fieldset title="Configuração">
                                <FormGroup>
                                    <FormItem cols="4">
                                        <RadioFields
                                            label="Selecione uma das opções abaixo:"
                                            inline={true}
                                            name="type"
                                            options={this.__getQuestionExamOptions()}
                                        />
                                    </FormItem>

                                    <FormItem cols="4">
                                        <Field
                                            label="Tipo de questão"
                                            name="question"
                                            component={SelectField}
                                            options={this.__getQuestionTypeOptions()}
                                        />
                                    </FormItem>
                                </FormGroup>
                            </Fieldset>

                            <FieldArray name="alternatives">
                                {({ fields }) => (
                                    <Fieldset title="Alternativas" array={fields}>
                                        {fields.map((alternative, index) => (
                                            <Field
                                                key={index}
                                                component={VorFQuestion}
                                                type="checkbox"
                                                name={`${alternative}.is_correct`}
                                                form={true}
                                                id={index}
                                                label={
                                                    <Field
                                                        component={AlternativeField}
                                                        label={`Alternativa ${index + 1}`}
                                                        removeField={() => this.__removeField(fields, index)}
                                                        name={`${alternative}.title`}
                                                    />
                                                }
                                            />
                                        ))}
                                    </Fieldset>
                                )}
                            </FieldArray>

                            <FormSubmitButtons reset={form.reset} disabled={submitting || invalid} />
                        </FormStyled>
                    )
                } />
            </Main>
		)
  	}
}

const mapStateToProps = state => {
    const { location } = state.router;

    let initialValues = {
        title: "",
        description: "",
        type: QUESTION_EXAM.EXERCISE.value,
        question: QUESTION_TYPE.MULTIPLE_CHOICES.value,
        alternatives: []
    }

    let obj = location.state.form;

    if (obj)
        initialValues = {
            title: obj.title || initialValues.title,
            description: obj.description || initialValues.description,
            type: obj.type|| initialValues.type,
            question: obj.question || initialValues.question,
            alternatives: obj.alternatives || initialValues.alternatives
        } 

    return { state: location.state, obj, initialValues}
}

export default connect(mapStateToProps)(QuestionForm);