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
import { createQuestionSagas } from '../actions';
import { V_OR_F, MULTIPLE_CHOICES, SHOT, SCRATCH_CARD } from '../constants';

class QuestionForm extends Component {
    constructor(props) {
        super(props);

        this.state = {title: "Criar questão"}
    }

    __submit(data, form) {
        const { dispatch, obj } = this.props;
        console.log(data);

        // if (obj)
        //     console.log("Atualizando!");
        // else
        //     dispatch(createQuestionSagas(data));

        setTimeout(form.reset);
    }

    __removeField(fields, index) {
        fields.remove(index);
    }

    render() {
        const { state, obj, initialValues } = this.props;
        const discipline = state.discipline;
        const section = state.section;

        if (obj) this.setState({title: "Editar questão"});

        const navigator = [
            {title: "Home", url: "/", state: null},
            {title: "Perfil", url: "/profile", state: null},
            {title: discipline.title, url: `/profile/${makeURL(discipline.title)}/detail`, state: { discipline } },
            {title: "Seções", url: `/profile/${makeURL(discipline.title)}/sections`, state: { discipline } },
            {title: section.title, url: `/profile/${makeURL(discipline.title)}/sections/${makeURL(section.title)}/detail`, state },
            {title: "Questões", url: `/profile/${makeURL(discipline.title)}/sections/${makeURL(section.title)}/questions`, state }
        ]

      	return (
            <Main navigation={navigator} menu="traditional" title={this.state.title} icon="fa-clipboard">
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
                                            name="is_exercise"
                                            options={[
                                                {label: "Exercício", value: "true"},
                                                {label: "Avaliação", value: "false"}
                                            ]}
                                        />
                                    </FormItem>

                                    <FormItem cols="4">
                                        <Field
                                            label="Tipo de questão"
                                            name="question_type"
                                            component={SelectField}
                                            options={[
                                                {title: "Multipla Escolha", value: MULTIPLE_CHOICES},
                                                {title: "V ou F", value: V_OR_F},
                                                {title: "Apostas", value: SHOT},
                                                {title: "Raspadinha", value: SCRATCH_CARD}
                                            ]}
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
    const { obj } = state.exercise;

    let initialValues = {
        title: "",
        description: "",
        is_exercise: "true",
        question_type: "MULTIPLE_CHOICES",
        alternatives: []
    }

    if (obj)
        initialValues = {
            title: obj.title || initialValues.title,
            description: obj.description || initialValues.description,
            is_exercise: obj.is_exercise || initialValues.is_exercise,
            question_type: obj.question_type || initialValues.question_type,
            alternatives: obj.alternatives || initialValues.alternatives
        } 

    return { state: location.state, obj, initialValues}
}

export default connect(mapStateToProps)(QuestionForm);