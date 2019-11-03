import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { InputField, FileField, CheckboxField } from 'common/fields';
import { updateUserSagas } from '../actions';
import { validateUpdateUser } from '../validate';
import { Main, FormStyled, Fieldset, SubmitButton } from 'common';

class UpdateProfile extends Component {
    __submit(data) {
        const { dispatch } = this.props;
        dispatch(updateUserSagas(data));
    }

    render() {
        const { account, initialValues } = this.props;

        const navigator = [
            {title: "Home", url: "/"},
            {title: "Perfil", url: "/profile"},
            {title: "Atualizar", url: "/profile/update"}
        ]

      	return (
            <Main navigation={navigator} menu="profile" title="Atualizar Informações Pessoais" icon="fa-edit">
                <Form
                    onSubmit={(data) => this.__submit(data)}
                    initialValues={initialValues}
                    validate={validateUpdateUser}
                    render={({handleSubmit, submitting, invalid}) => (
                        <FormStyled onSubmit={handleSubmit}>
                            <Field
                                component={FileField}
                                type="file"
                                name="photo"
                                className="form-control"
                            />
                            {account.photo ?
                                <Field
                                    component={CheckboxField}
                                    type="checkbox"
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
                        </FormStyled>
                    )}
                />
            </Main>
		)
  	}
}

const mapStateToProps = state => {
    const { user } = state.account;

    if (!user)
        return {initialValues: {}}

    return {
        account: user,
        initialValues: {
            photo: user.photo,
            name: user.user.name,
            email: user.user.email,
            identifier: user.identifier
        }
    }
}

export default connect(mapStateToProps)(UpdateProfile);