import React from 'react';

export const Form = ({ children, onSubmit }) => (
    <form onSubmit={onSubmit} acceptCharset="utf-8">
        <div className="input-group">{children}</div>
    </form>
)

export const SubmitButton = () => (
    <div className="input-group-btn">
        <button className="btn btn-primary btn-border" type="submit">
            <i className="fa fa-search"></i>
        </button>
    </div>
)
