import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { SimpleInputField } from 'common/fields';
import { Navbar } from 'common';
import { resetPasswordSagas } from '../actions';
import { Container, FormStyled, FormGroup, SubmitButton, Main } from '../styles/resetPassword';
import { validateResetPassword } from '../validate';

class ResetPassword extends Component {

    __submit(data) {
        const { dispatch } = this.props;
        dispatch(resetPasswordSagas(data))
    }

    render() {
        const { initialValues } = this.props;

      	return (
            <Main>
                <Navbar />
                <Container title="Resetar senha">
                    <Form
                        onSubmit={(data) => this.__submit(data)}
                        initialValues={initialValues}
                        validate={validateResetPassword}
                        render={({handleSubmit, submitting, invalid}) => (
                            <FormStyled onSubmit={handleSubmit}>
                                <FormGroup icon="fa-envelope-o">
                                    <Field
                                        component={SimpleInputField}
                                        type="text"
                                        name="email"
                                        className="input-login form-control"
                                        placeholder="Email de recuperação."
                                        autoFocus
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

const mapStateToProps = () => {
    const remembered = JSON.parse(localStorage.getItem("remembered"));

	return {
		initialValues: { email: remembered ? remembered.email : ""}
	}
}

export default connect(mapStateToProps)(ResetPassword);