import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormStyled, SubmitButton } from '../styles/search';
import Filter from './Filter';
import { Form, Field } from 'react-final-form';

class Search extends Component {
    render() {
        const { onSubmit, filterList, filterTitle, filterSubmit, placeholder="Pesquisa", name="search", icon="fa-search" } = this.props;

        return (
            <Form
                onSubmit={(data, form) => onSubmit(data, form)}
                render={({ handleSubmit }) => (
                    <FormStyled onSubmit={handleSubmit}>

                        {filterList ? <Filter filterTitle={filterTitle} filterList={filterList} filterSubmit={filterSubmit} /> : null}
                        
                        <Field
                            component={"input"}
                            type="text"
                            name={name}
                            className="form-control"
                            placeholder={placeholder}
                        />

                        <SubmitButton icon={icon} />
                    </FormStyled>
                )}
            />
        )
    }
}

export default connect()(Search);