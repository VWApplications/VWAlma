import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { InputField, FileField, CheckboxField } from 'common/fields';
import { updateUserSagas } from '../actions';
import { validateUpdateUser } from '../validate';
import {
    Main, PageHeader, Container, Form, Fieldset,
    SubmitButton
} from 'common';

class UpdateProfile extends Component {

    __submit(data) {
        const { dispatch } = this.props;
        dispatch(updateUserSagas(data));
    }

    render() {
        const { handleSubmit, submitting, invalid, user } = this.props;

        const navigator = [
            {title: "Home", url: "/"},
            {title: "Perfil", url: "/profile"},
            {title: "Atualizar", url: "/profile/update"}
        ]

      	return (
            <Main navigation={navigator} menu="profile">
                <PageHeader>Atualizar Informações Pessoais</PageHeader>
                <Form onSubmit={handleSubmit((data) => this.__submit(data))}>
                    <Field
                        component={FileField}
                        type="file"
                        name="photo"
                        className="form-control"
                    />
                    {user.photo ?
                        <Field
                            component={CheckboxField}
                            name="clean"
                            label="Remover foto"
                        />
                    : "" }

                    <Fieldset title="Informações Pessoais">
                        <Field
                            component={InputField}
                            id="name"
                            type="text"
                            label="Nome"
                            className="form-control"
                            name="name"
                            placeholder="Nome do usuário"
                        />

                        <Field
                            component={InputField}
                            id="email"
                            type="email"
                            label="Email"
                            className="form-control"
                            name="email"
                            placeholder="Email de autenticação"
                        />

                        <Field
                            component={InputField}
                            id="identifier"
                            type="text"
                            label="Matrícula"
                            className="form-control"
                            name="identifier"
                            placeholder="Matrícula de identificação"
                        />
                    </Fieldset>

                    <SubmitButton disabled={submitting || invalid}>Enviar</SubmitButton>
                </Form>
            </Main>
		)
  	}
}

const form = reduxForm({
    form: "UpdateProfileForm",
    validate: validateUpdateUser,
    enableReinitialize: true
})(UpdateProfile);

const mapStateToProps = state => {
    const { user } = state.account;

    if (!user)
        return {initialValues: {}}

    return {
        user,
        initialValues: {
            photo: user.photo,
            name: user.name,
            email: user.email,
            identifier: user.identifier
        }
    }
}

export default connect(mapStateToProps)(form);