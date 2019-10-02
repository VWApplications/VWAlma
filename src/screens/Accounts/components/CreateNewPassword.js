import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { SimpleInputField } from 'common/fields';
import { Navbar } from 'common';
import { createNewPasswordSagas } from '../actions';
import { Container, Form, FormGroup, SubmitButton, Main } from '../styles/resetPassword';
import { validate } from '../validate';

class CreateNewPassword extends Component {

    __submit(data) {
        const { dispatch } = this.props;
        dispatch(createNewPasswordSagas(data))
    }

    render() {
        const { handleSubmit, submitting, invalid } = this.props;

      	return (
            <Main>
                <Navbar />
                <Container title="Criar nova senha">
                    <Form onSubmit={handleSubmit((data) => this.__submit(data))}>
                        <FormGroup icon="fa-key">
                            <Field
                                component={SimpleInputField}
                                type="text"
                                name="key"
                                className="input-login form-control"
                                placeholder="Chave de recuperação."
                                autoFocus
                            />
                        </FormGroup>

                        <FormGroup icon="fa-lock">
                            <Field
                                component={SimpleInputField}
                                type="password"
                                name="new_password"
                                className="input-login form-control"
                                placeholder="Nova senha."
                            />
                        </FormGroup>

                        <FormGroup icon="fa-lock">
                            <Field
                                component={SimpleInputField}
                                type="password"
                                name="confirm_password"
                                className="input-login form-control"
                                placeholder="Confirmar nova senha."
                            />
                        </FormGroup>

                        <SubmitButton disabled={submitting || invalid}>Enviar</SubmitButton>
                    </Form>
                </Container>
            </Main>
		)
  	}
}

const form = reduxForm({
    form: "CreateNewPasswordForm",
    validate: validate,
    enableReinitialize: true
})(CreateNewPassword);

export default connect()(form);