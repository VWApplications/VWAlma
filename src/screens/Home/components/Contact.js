import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { TextField, SimpleInputField } from 'common/fields';
import { validate } from '../validate';
import { ParallaxStyled } from '../styles/parallax';
import { PageHeader, ContactSubmitButton, InputGroup, FormGroup } from '../styles/contact';

class Contact extends Component {

    __submit(data) {
        console.log(data);
	}

    render() {
        const { handleSubmit, submitting, invalid } = this.props;

      	return (
            <ParallaxStyled id="contact">
                <div className="row">
                    <PageHeader>Contato</PageHeader>
          
                    <form className="container" onSubmit={handleSubmit((data) => this.__submit(data))} autoComplete="off" noValidate>
                        <div className="row">
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
                        </div>
                
                        <br />
                
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
                    </form>
                </div>
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