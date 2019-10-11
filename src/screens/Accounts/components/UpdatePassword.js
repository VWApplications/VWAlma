import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { InputField } from 'common/fields';
import { updatePasswordSagas } from '../actions';
import { validateUpdatePassword } from '../validate';
import {
    Main, PageHeader, Form, Fieldset,
    SubmitButton
} from 'common';

class UpdatePassword extends Component {

    __submit(data) {
        const { dispatch } = this.props;
        dispatch(updatePasswordSagas(data));
    }

    render() {
        const { handleSubmit, submitting, invalid } = this.props;

        const navigator = [
            {title: "Home", url: "/"},
            {title: "Perfil", url: "/profile"},
            {title: "Atualizar Senha", url: "/profile/update-password"}
        ]

      	return (
            <Main navigation={navigator} menu="profile">
                <PageHeader>Atualizar Senha</PageHeader>
                <Form onSubmit={handleSubmit((data) => this.__submit(data))}>
                    <Fieldset title="Antiga Senha">
                        <Field
                            component={InputField}
                            type="password"
                            id="password"
                            label="Senha antiga"
                            className="form-control"
                            name="password"
                            placeholder="Senha antiga"
                        />
                    </Fieldset>
                    <Fieldset title="Nova senha">
                        <Field
                            component={InputField}
                            id="new_password"
                            type="password"
                            label="Nova senha"
                            className="form-control"
                            name="new_password"
                            placeholder="Nova senha"
                        />

                        <Field
                            component={InputField}
                            type="password"
                            id="confirm_password"
                            label="Confirmar Senha"
                            className="form-control"
                            name="confirm_password"
                            placeholder="Confirmar nova senha"
                        />
                    </Fieldset>

                    <SubmitButton disabled={submitting || invalid}>Enviar</SubmitButton>
                </Form>
            </Main>
		)
  	}
}

const form = reduxForm({
    form: "UpdatePasswordForm",
    validate: validateUpdatePassword,
    enableReinitialize: true
})(UpdatePassword);

export default connect()(form);