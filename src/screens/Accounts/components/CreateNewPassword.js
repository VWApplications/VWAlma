import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { SimpleInputField } from 'common/fields';
import { Navbar } from 'common';
import { createNewPasswordSagas } from '../actions';
import { Container, FormStyled, FormGroup, SubmitButton, Main } from '../styles/resetPassword';
import { validateNewPassword } from '../validate';

class CreateNewPassword extends Component {

    __submit(data, form) {
        const { dispatch } = this.props;
        dispatch(createNewPasswordSagas(data));
        setTimeout(form.reset);
    }

    render() {
      	return (
            <Main>
                <Navbar />
                <Container title="Criar nova senha">
                    <Form
                        onSubmit={(data, form) => this.__submit(data, form)}
                        validate={validateNewPassword}
                        render={({handleSubmit, submitting, invalid}) => (
                            <FormStyled onSubmit={handleSubmit}>
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
                            </FormStyled>
                        )}
                    />
                </Container>
            </Main>
		)
  	}
}

export default connect()(CreateNewPassword);