import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { SimpleInputField } from 'common/fields';
import { Navbar } from 'common';
import { Container, Form, FormGroup, SubmitButton, SelectGroup, Line } from '../styles/register';
import { registerSagas } from '../actions';
import { validate } from '../validate';

class Register extends Component {

    __submit(data) {
        const { dispatch } = this.props;
		dispatch(registerSagas(data));
    }

    render() {
        const { handleSubmit, submitting, invalid } = this.props;

      	return (
            <main>
                <Navbar />
                <Container>
                    <Form onSubmit={handleSubmit((data) => this.__submit(data))}>
                        <SelectGroup label="Selecione o tipo de usuário">
                            <Field id="selectID" name="is_teacher" component="select" className="input-login form-control">
                                <option value={true}>Professor</option>
                                <option value={false}>Aluno</option>
                            </Field>
                        </SelectGroup>

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
            </main>
		)
  	}
}

const form = reduxForm({
    form: "RegisterForm",
    validate: validate,
    enableReinitialize: true
})(Register);

export default connect()(form);