import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Form, Field } from 'react-final-form';
import { SimpleInputField, CheckboxField } from 'common/fields';
import { Navbar } from 'common';
import { loginSagas } from '../actions';
import { Container, FormStyled, FormGroup, SubmitButton, ForgetPassword, Main } from '../styles/login';
import { validateLogin } from '../validate';

class Login extends Component {

    __forgetPassword() {
        const { dispatch } = this.props;
        dispatch(push("/reset-password"));
    }

    __submit(data) {
        const { dispatch } = this.props;
		dispatch(loginSagas(data));
    }

    render() {
        const { initialValues } = this.props;

      	return (
            <Main>
                <Navbar />
                <Container>
                    <Form
                        onSubmit={(data) => this.__submit(data)}
                        initialValues={initialValues}
                        validate={validateLogin}
                        render={({handleSubmit, submitting, invalid}) => (
                            <FormStyled onSubmit={handleSubmit}>
                                <FormGroup icon="fa-user">
                                    <Field
                                        component={SimpleInputField}
                                        type="text"
                                        name="email"
                                        className="input-login form-control"
                                        placeholder="Email de autenticação."
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

                                <Field
                                    component={CheckboxField}
                                    name="rememberMe"
                                    login={true}
                                    label="Lembrar"
                                />

                                <SubmitButton disabled={submitting || invalid}>Entrar</SubmitButton>
                                <ForgetPassword onClick={() => this.__forgetPassword()}>Esqueceu a senha?</ForgetPassword>
                            </FormStyled>
                        )}
                    />
                </Container>
            </Main>
		)
  	}
}

const mapStateToProps = () => {
    const remembered = JSON.parse(localStorage.getItem("remembered"));

	return {
		initialValues: {
			email: remembered ? remembered.email : "",
			rememberMe: remembered ? true : false
		}
	}
}

export default connect(mapStateToProps)(Login);