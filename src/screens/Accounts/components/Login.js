import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { SimpleInputField } from 'common/fields';
import { Container, Form, FormGroup, SubmitButton, ForgetPassword } from '../styles/login';
import { validate } from '../validate';

class Login extends Component {

    __forgetPassword() {
        console.log("Esqueceu sua senha?")
    }

    __submit(data) {
        console.log(data);
    }

    render() {
        const { handleSubmit, submitting, invalid } = this.props;

      	return (
            <Container>
                <Form onSubmit={handleSubmit((data) => this.__submit(data))}>
                    <FormGroup icon="fa-user">
                        <Field
                            component={SimpleInputField}
                            type="text"
                            name="username"
                            className="input-login form-control"
                            placeholder="Nome de usuário ou matrícula."
                            autoFocus
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

                    <SubmitButton disabled={submitting || invalid}>Entrar</SubmitButton>
                    <ForgetPassword onClick={() => this.__forgetPassword()}>Esqueceu a senha?</ForgetPassword>
                </Form>
            </Container>
		)
  	}
}

const form = reduxForm({
    form: "LoginForm",
    validate: validate,
    enableReinitialize: true
})(Login);

export default connect()(form);