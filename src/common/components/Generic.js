import React from 'react';
import styled from 'styled-components';

const PageHeader = ({ children }) => (
    <div className="page-header profile">
        <h1 className="white">{children}</h1>
    </div>
)

const Container = ({ children }) => (
    <div className="row">
      <div className="panel panel-default panel-content">
        <div className="panel-body">{children}</div>
      </div>
    </div>
)

const Form = ({ children, onSubmit }) => (
    <form onSubmit={onSubmit} encType="multipart/form-data" noValidate>
        {children}
    </form>
)

const CustomFieldset = styled.fieldset`
    padding: 5px;
    margin: 10px;
    border: 1px solid #ccc;
    margin-bottom: 30px;

    > legend {
        margin-bottom: 0;
    }
`;

const Fieldset = ({ children, title }) => (
    <CustomFieldset>
        <legend style={{"paddingLeft": "5px"}}>{title}</legend><br />
        {children}
    </CustomFieldset>
)

const SubmitButton = ({ children, disabled }) => (
    <button type="submit" className="btn btn-primary center-block btn-block" disabled={disabled}>
        <i className="fa fa-send"></i> {children}
    </button>
)

const Button = ({ children, onClick, icon }) => (
    <button type="button" className="btn btn-primary center-block btn-block" onClick={onClick}>
        <i className={"fa " + icon}></i> {children}
    </button>
)

const BreakLine = () => (<br />)
const Line = () => (<hr />)

export {
    PageHeader, Container, Form, Fieldset,
    BreakLine, Line, SubmitButton, Button
};