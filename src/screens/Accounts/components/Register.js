import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { SimpleInputField, SelectField } from 'common/fields';
import { Navbar } from 'common';
import { Container, Form, FormGroup, SubmitButton, Line, Main } from '../styles/register';
import { registerSagas } from '../actions';
import { validateRegister } from '../validate';

class Register extends Component {

    __submit(data) {
        const { dispatch } = this.props;
		dispatch(registerSagas(data));
    }

    render() {
        const { handleSubmit, submitting, invalid } = this.props;

        const options = [
            {title: "Professor", value: true},
            {title: "Aluno", value: false}
        ]

      	return (
            <Main>
                <Navbar />
                <Container>
                    <Form onSubmit={handleSubmit((data) => this.__submit(data))}>
                        <SelectField
                            label="Selecione o tipo de usuário"
                            name="is_teacher"
                            className="input-login"
                            options={options}
                        />

                        <FormGroup icon="fa-user">
                            <Field
                                component={SimpleInputField}
                                type="text"
                                name="name"
                                className="input-login form-control"
                                placeholder="Nome do usuário"
                            />
                        </FormGroup>

                        <FormGroup icon="fa-envelope">
                            <Field
                                component={SimpleInputField}
                                type="email"
                                name="email"
                                className="input-login form-control"
                                placeholder="Email de autenticação."
                            />
                        </FormGroup>

                        <FormGroup icon="fa-lock">
                            <Field
                                component={SimpleInputField}
                                type="password"
                                name="password"
                                className="input-login form-control"
                                placeholder="Senha de acesso."
                            />
                        </FormGroup>

                        <FormGroup icon="fa-lock">
                            <Field
                                component={SimpleInputField}
                                type="password"
                                name="confirm_password"
                                className="input-login form-control"
                                placeholder="Confirmar senhar."
                            />
                        </FormGroup>

                        <Line />

                        <SubmitButton disabled={submitting || invalid}>Enviar</SubmitButton>
                    </Form>
                </Container>
            </Main>
		)
  	}
}

const form = reduxForm({
    form: "RegisterForm",
    validate: validateRegister,
    enableReinitialize: true
})(Register);

export default connect()(form);