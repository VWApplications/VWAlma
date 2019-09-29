import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { InputField, FileField } from 'common/fields';
import { validate } from '../validate';
import {
    Main, PageHeader, Container, Form, Fieldset,
    SubmitButton
} from 'common';

class UpdateProfile extends Component {

    __submit(data) {
        console.log(data);
    }

    render() {
        const { handleSubmit, submitting, invalid } = this.props;

        const navigator = [
            {title: "Home", url: "/"},
            {title: "Perfil", url: "/profile"},
            {title: "Atualizar", url: "/profile/update"}
        ]

      	return (
            <Main navigation={navigator} menu="profile">
                <PageHeader>Atualizar Informações Pessoais</PageHeader>
                <Container>
                    <Form onSubmit={handleSubmit((data) => this.__submit(data))} className="form-horizontal">
                        <Field
                            component={FileField}
                            type="file"
                            name="photo"
                            className="form-control"
                        />

                        <Fieldset title="Informações Pessoais">
                            <Field
                                component={InputField}
                                type="text"
                                label="Nome"
                                className="form-control"
                                name="name"
                                placeholder="Nome do usuário"
                            />

                            <Field
                                component={InputField}
                                type="email"
                                label="Email"
                                className="form-control"
                                name="email"
                                placeholder="Email de autenticação"
                            />
                        </Fieldset>

                        <SubmitButton disabled={submitting || invalid}>Enviar</SubmitButton>
                    </Form>
                </Container>
            </Main>
		)
  	}
}

const form = reduxForm({
    form: "UpdateProfileForm",
    validate: validate,
    enableReinitialize: true
})(UpdateProfile);

const mapStateToProps = state => {
    const { user } = state.account;

    if (!user)
        return {initialValues: {}}

    return {
        initialValues: {
            photo: user.photo,
            name: user.name,
            email: user.email
        }
    }
}

export default connect(mapStateToProps)(form);