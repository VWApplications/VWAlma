import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { SimpleInputField } from 'common/fields';
import { Navbar } from 'common';
import { resetPasswordSagas } from '../actions';
import { Container, Form, FormGroup, SubmitButton } from '../styles/resetPassword';
import { validate } from '../validate';

class ResetPassword extends Component {

    __submit(data) {
        const { dispatch } = this.props;
        dispatch(resetPasswordSagas(data))
    }

    render() {
        const { handleSubmit, submitting, invalid } = this.props;

      	return (
            <main>
                <Navbar />
                <Container title="Resetar senha">
                    <Form onSubmit={handleSubmit((data) => this.__submit(data))}>
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
                    </Form>
                </Container>
            </main>
		)
  	}
}

const form = reduxForm({
    form: "ResetPasswordForm",
    validate: validate,
    enableReinitialize: true
})(ResetPassword);

const mapStateToProps = () => {
    const remembered = JSON.parse(localStorage.getItem("remembered"));

	return {
		initialValues: { email: remembered ? remembered.email : ""}
	}
}

export default connect(mapStateToProps)(form);