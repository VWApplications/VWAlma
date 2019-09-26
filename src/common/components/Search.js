import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

class Search extends Component {
    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit} acceptCharset="utf-8">
                <div className="input-group">
                    <Field
                        component={"input"}
                        type="text"
                        name="search"
                        className="form-control"
                        placeholder="Pesquisa"
                    />

                    <div className="input-group-btn">
                        <button className="btn btn-primary btn-border" type="submit">
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

const form = reduxForm({
    form: "SearchForm",
    enableReinitialize: true
})(Search);

export default connect()(form);