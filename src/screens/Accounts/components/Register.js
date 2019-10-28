import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { SimpleInputField, SelectField } from 'common/fields';
import { Navbar } from 'common';
import { TEACHER, STUDENT } from 'common/constants';
import { Container, FormStyled, FormGroup, SubmitButton, Line, Main } from '../styles/register';
import { registerSagas } from '../actions';
import { validateRegister } from '../validate';

class Register extends Component {
    __submit(data) {
        const { dispatch } = this.props;
		dispatch(registerSagas(data));
    }

    render() {
        const options = [
            {title: "Aluno", value: STUDENT},
            {title: "Professor", value: TEACHER}
        ]

        const initialValues = {permission: STUDENT}

      	return (
            <Main>
                <Navbar />
                <Container>
                    <Form
                        onSubmit={(data) => this.__submit(data)}
                        initialValues={initialValues}
                        validate={validateRegister}
                        render={({handleSubmit, submitting, invalid}) => (
                            <FormStyled onSubmit={handleSubmit}>
                                <Field
                                    component={SelectField}
                                    color="white"
                                    label="Selecione o tipo de usuário"
                                    name="permission"
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
                            </FormStyled>
                        )}
                    />
                </Container>
            </Main>
		)
  	}
}

export default connect()(Register);