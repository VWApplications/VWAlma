import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, SubmitButton } from '../styles/search';
import Filter from './Filter';
import { reduxForm, Field } from 'redux-form';

class Search extends Component {
    render() {
        const { handleSubmit, filterList, filterTitle, filterSubmit, placeholder="Pesquisa", name="search", icon="fa-search" } = this.props;

        return (
            <Form onSubmit={handleSubmit}>

                {filterList ? <Filter filterTitle={filterTitle} filterList={filterList} filterSubmit={filterSubmit} /> : null}
                
                <Field
                    component={"input"}
                    type="text"
                    name={name}
                    className="form-control"
                    placeholder={placeholder}
                />

                <SubmitButton icon={icon} />
            </Form>
        )
    }
}

const form = reduxForm({
    form: "SearchForm",
    enableReinitialize: true
})(Search);

export default connect()(form);