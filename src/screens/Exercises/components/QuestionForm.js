import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import { InputField, EditorField, RadioFields, SelectField } from 'common/fields';
import { makeURL } from 'common/utils';
import { Main, Form, Fieldset, SubmitButton } from 'common';
import { FormGroup, FormItem } from '../styles/questionForm';
import { validateQuestionForm } from '../validate';
import { createQuestionSagas } from '../actions';

class QuestionForm extends Component {
    constructor(props) {
        super(props);
        const { initialValues } = this.props;

        let opened = false;
        if (initialValues.type === "MULTIPLE_CHOICES")
            opened = true;

        this.state = { type: initialValues.type, opened };
    }

    __submit(data) {
        const { dispatch, obj } = this.props;

        if (obj)
            console.log("Atualizando!");
        else
            dispatch(createQuestionSagas(data));

        dispatch(reset("QuestionForm"));
        window.location.reload();
    }

    __changeType(type) {
        this.setState({ type });
        if (type === "MULTIPLE_CHOICES")
            this.setState({ opened: true });
        else
            this.setState({ opened: false });
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

        let correct_answer_list = [
            {title: "Verdadeiro", value: "TRUE"},
            {title: "Falso", value: "FALSE"}
        ]
        if (this.state.type === "MULTIPLE_CHOICES")
            correct_answer_list = [
                {title: "Alternativa A", value: "A"},
                {title: "Alternativa B", value: "B"},
                {title: "Alternativa C", value: "C"},
                {title: "Alternativa D", value: "D"}
            ]

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
                                    onChange={(data) => this.__changeType(data.currentTarget.value)}
                                    options={[
                                        {title: "Multipla Escolha", value: "MULTIPLE_CHOICES"},
                                        {title: "V ou F", value: "V_OR_F"}
                                    ]}
                                />
                            </FormItem>

                            <FormItem cols="4">
                                <SelectField
                                    label="Resposta Correta"
                                    empty={true}
                                    color="black"
                                    name="correct_answer"
                                    options={correct_answer_list}
                                />
                            </FormItem>
                        </FormGroup>
                    </Fieldset>

                    {this.state.opened ?
                        <Fieldset title="Alternativas">
                            <Field
                                component={InputField}
                                type="text"
                                labelClass="label-size"
                                labelCol="1"
                                fieldCol="11"
                                label="A)"
                                className="form-control"
                                name="alternative_A"
                                placeholder="Descrição da alternativa A"
                            />

                            <Field
                                component={InputField}
                                type="text"
                                labelClass="label-size"
                                labelCol="1"
                                fieldCol="11"
                                label="B)"
                                className="form-control"
                                name="alternative_B"
                                placeholder="Descrição da alternativa B"
                            />

                            <Field
                                component={InputField}
                                type="text"
                                labelClass="label-size"
                                labelCol="1"
                                fieldCol="11"
                                label="C)"
                                className="form-control"
                                name="alternative_C"
                                placeholder="Descrição da alternativa C"
                            />

                            <Field
                                component={InputField}
                                type="text"
                                labelClass="label-size"
                                labelCol="1"
                                fieldCol="11"
                                label="D)"
                                className="form-control"
                                name="alternative_D"
                                placeholder="Descrição da alternativa D"
                            />
                        </Fieldset>
                    : null}

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
        correct_answer: null,
        alternative_A: "",
        alternative_B: "",
        alternative_C: "",
        alternative_D: "",
    };
    if (obj)
        initialValues = {
            title: obj.title || "",
            description: obj.description || "",
            is_exercise: obj.is_exercise || "",
            type: obj.type || "MULTIPLE_CHOICES",
            correct_answer: obj.correct_answer || null,
            alternative_A: obj.alternative_A || "",
            alternative_B: obj.alternative_B || "",
            alternative_C: obj.alternative_C || "",
            alternative_D: obj.alternative_D || "",
        }

    return {
        state: location.state,
        initialValues
    }
}

export default connect(mapStateToProps)(form);