import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray, reset } from 'redux-form';
import { InputField, EditorField, RadioFields, SelectField, AlternativeField, CheckboxField } from 'common/fields';
import { makeURL } from 'common/utils';
import { Main, Form, Fieldset, SubmitButton } from 'common';
import { FormGroup, FormItem } from '../styles/questionForm';
import { validateQuestionForm } from '../validate';
import { createQuestionSagas } from '../actions';
import { V_OR_F, MULTIPLE_CHOICES, SHOT, SCRATCH_CARD } from '../constants';

class QuestionForm extends Component {
    constructor(props) {
        super(props);
        const { initialValues } = this.props;

        this.state = { type: initialValues.type };
    }

    __submit(data) {
        const { dispatch, obj } = this.props;
        console.log(data);

        if (obj)
            console.log("Atualizando!");
        else
            dispatch(createQuestionSagas(data));

        dispatch(reset("QuestionForm"));
    }

    __removeField(fields, index) {
        fields.remove(index)
    }

    render() {
        const { handleSubmit, submitting, invalid, state, obj } = this.props;
        const discipline = state.discipline;
        const section = state.section;

        let title = "Criar questão";
        if (obj)
            title = "Editar questão";

        const navigator = [
            {title: "Home", url: "/", state: null},
            {title: "Perfil", url: "/profile", state: null},
            {title: discipline.title, url: `/profile/${makeURL(discipline.title)}/detail`, state: { discipline } },
            {title: "Seções", url: `/profile/${makeURL(discipline.title)}/sections`, state: { discipline } },
            {title: section.title, url: `/profile/${makeURL(discipline.title)}/sections/${makeURL(section.title)}/detail`, state },
            {title: "Questões", url: `/profile/${makeURL(discipline.title)}/sections/${makeURL(section.title)}/questions`, state }
        ]

        const renderAlternatives = ({ fields }) => (
            <Fieldset title="Alternativas" array={fields}>
                {fields.map((alternative, index) => (
                    <Field
                        key={index}
                        component={CheckboxField}
                        name={`${alternative}.is_correct`}
                        question={true}
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
        )
        

      	return (
            <Main navigation={navigator} menu="traditional" title={title} icon="fa-clipboard">
                <Form onSubmit={handleSubmit((data) => this.__submit(data))}>
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
                                    inputs={[
                                        {title: "Exercício", value: "true"},
                                        {title: "Avaliação", value: "false"}
                                    ]}
                                />
                            </FormItem>

                            <FormItem cols="4">
                                <SelectField
                                    label="Tipo de questão"
                                    color="black"
                                    name="question_type"
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

                    <FieldArray name="alternatives" component={renderAlternatives} />

                    <SubmitButton disabled={submitting || invalid}>Enviar</SubmitButton>
                </Form>
            </Main>
		)
  	}
}

const form = reduxForm({
    form: "QuestionForm",
    validate: validateQuestionForm,
    enableReinitialize: true
})(QuestionForm);

const mapStateToProps = state => {
    const { location } = state.router;
    const { obj } = state.exercise;

    let initialValues = {
        title: "",
        description: "",
        is_exercise: "true",
        type: "MULTIPLE_CHOICES",
        alternatives: []
    };
    if (obj)
        initialValues = {
            title: obj.title || "",
            description: obj.description || "",
            is_exercise: obj.is_exercise || "",
            type: obj.type || "MULTIPLE_CHOICES",
            alternatives: obj.alternatives || []
        }

    return {
        state: location.state,
        initialValues
    }
}

export default connect(mapStateToProps)(form);