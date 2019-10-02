import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { TextField, SimpleInputField } from 'common/fields';
import { validate } from '../validate';
import { contactAction } from '../actions';
import { ParallaxStyled } from '../styles/parallax';
import {
    PageHeader, ContactSubmitButton, InputGroup, FormGroup,
    Container, Form, Formset
} from '../styles/contact';

class Contact extends Component {

    __submit(data) {
        const { dispatch } = this.props;
        dispatch(contactAction(data));
	}

    render() {
        const { handleSubmit, submitting, invalid } = this.props;

      	return (
            <ParallaxStyled id="contact">
                <Container>
                    <PageHeader>Contato</PageHeader>
          
                    <Form onSubmit={handleSubmit((data) => this.__submit(data))}>
                        <Formset>
                            <InputGroup icon="fa-user-circle" title="nome">
                                <Field
                                    component={SimpleInputField}
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Nome para contato."
                                />
                            </InputGroup>

                            <InputGroup icon="fa-envelope" title="email">
                                <Field
                                    component={SimpleInputField}
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Email para contato."
                                />
                            </InputGroup>
                        </Formset>
                
                        <FormGroup>
                            <Field
                                component={TextField}
                                name="message"
                                className="form-control"
                                placeholder="Mensagem de contato."
                                rows="10"
                            />
                        </FormGroup>

                        <ContactSubmitButton not_submit={submitting || invalid} />
                    </Form>
                </Container>
            </ParallaxStyled>          
		)
  	}
}

const form = reduxForm({
    form: "ContactForm",
    validate: validate,
    enableReinitialize: true
})(Contact);

export default connect()(form);