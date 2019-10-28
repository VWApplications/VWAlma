import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { InputField } from 'common/fields';
import { updatePasswordSagas } from '../actions';
import { validateUpdatePassword } from '../validate';
import { Main, FormStyled, Fieldset, SubmitButton } from 'common';

class UpdatePassword extends Component {

    __submit(data) {
        const { dispatch } = this.props;
        dispatch(updatePasswordSagas(data));
    }

    render() {
        const navigator = [
            {title: "Home", url: "/"},
            {title: "Perfil", url: "/profile"},
            {title: "Atualizar Senha", url: "/profile/update-password"}
        ]

      	return (
            <Main navigation={navigator} menu="profile" title="Atualizar Senha" icon="fa-expeditedssl">
                <Form
                    onSubmit={(data) => this.__submit(data)}
                    validate={validateUpdatePassword}
                    render={({handleSubmit, submitting, invalid}) => (
                        <FormStyled onSubmit={handleSubmit}>
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
                        </FormStyled>
                    )}
                />
            </Main>
		)
  	}
}

export default connect()(UpdatePassword);