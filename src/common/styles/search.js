import React from 'react';

export const FormStyled = ({ children, onSubmit }) => (
    <form onSubmit={onSubmit} acceptCharset="utf-8">
        <div className="input-group">{children}</div>
    </form>
)

export const SubmitButton = ({ icon }) => (
    <div className="input-group-btn">
        <button className="btn btn-primary btn-border" type="submit">
            <i className={"fa " + icon}></i>
        </button>
    </div>
)
