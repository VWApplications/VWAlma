import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { InputField, EditorField } from 'common/fields';
import { validateDiscipline } from '../validate';
import { createDisciplineSagas, updateDisciplineSagas } from '../actions';
import { Main, FormStyled, Fieldset, SubmitButton } from 'common';

class DisciplineForm extends Component {

    __submit(data) {
        const { dispatch, location } = this.props;

        if (!data.password)
            delete data.password;

        if (location.state)
            dispatch(updateDisciplineSagas(data, location.state.id));
        else
            dispatch(createDisciplineSagas(data));
    }

    render() {
        const { location, initialValues } = this.props;

        let title = "Criar disciplina";
        if (location.state)
            title = "Atualizar disciplina";

        const navigator = [
            {title: "Home", url: "/"},
            {title: "Perfil", url: "/profile"},
            {title: title, url: "/profile/discipline-form"}
        ]

      	return (
            <Main navigation={navigator} menu="profile" title={title} icon="fa-book">
                <Form
                    onSubmit={(data) => this.__submit(data)}
                    initialValues={initialValues}
                    validate={validateDiscipline}
                    render={({handleSubmit, submitting, invalid}) => (
                        <FormStyled onSubmit={handleSubmit}>
                            <Field
                                component={InputField}
                                type="text"
                                label="Título"
                                className="form-control"
                                name="title"
                                placeholder="Título da disciplina."
                            />

                            <Field
                                component={InputField}
                                type="text"
                                label="Curso"
                                className="form-control"
                                name="course"
                                placeholder="Curso na qual a disciplina pertence."
                            />

                            <Field
                                component={InputField}
                                type="text"
                                label="Instituição"
                                className="form-control"
                                name="institution"
                                placeholder="Instituição de ensino na qual a disciplina pertence."
                            />

                            <Field
                                component={EditorField}
                                name="description"
                                placeholder="Insira a ementa da disciplina aqui!"
                            />

                            <Fieldset title="Turma">
                                <Field
                                    component={InputField}
                                    type="text"
                                    label="Turma"
                                    className="form-control"
                                    name="classroom"
                                    placeholder="Turma da disciplina."
                                />

                                <Field
                                    component={InputField}
                                    type="password"
                                    label="Senha"
                                    className="form-control"
                                    name="password"
                                    placeholder="Senha da turma."
                                />

                                <Field
                                    component={InputField}
                                    type="number"
                                    label="Limite de estudantes"
                                    className="form-control"
                                    name="students_limit"
                                    placeholder="Limite de estudantes para entrar na turma."
                                />

                                <Field
                                    component={InputField}
                                    type="number"
                                    label="Limite de monitores"
                                    className="form-control"
                                    name="monitors_limit"
                                    placeholder="Limite de monitores para entrar na turma."
                                />
                            </Fieldset>

                            <SubmitButton disabled={submitting || invalid}>Enviar</SubmitButton>
                        </FormStyled>
                    )}
                />
            </Main>
		)
  	}
}

const mapStateToProps = state => {
    const { location } = state.router;

    if (!location.state) return {initialValues: {}}

    return {
        initialValues: {
            title: location.state.title || "",
            course: location.state.course || "",
            institution: location.state.institution || "",
            description: location.state.description || "",
            classroom: location.state.classroom || "",
            students_limit: location.state.students_limit || 5,
            monitors_limit: location.state.monitors_limit || 0
        }
    }
}

export default connect(mapStateToProps)(DisciplineForm);