import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, SubmitButton } from '../styles/search';
import { reduxForm, Field } from 'redux-form';

class Search extends Component {
    render() {
        const { handleSubmit } = this.props;

        return (
            <Form onSubmit={handleSubmit}>
                <Field
                    component={"input"}
                    type="text"
                    name="search"
                    className="form-control"
                    placeholder="Pesquisa"
                />

                <SubmitButton />
            </Form>
        )
    }
}

const form = reduxForm({
    form: "SearchForm",
    enableReinitialize: true
})(Search);

export default connect()(form);