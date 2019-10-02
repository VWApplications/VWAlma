import React from 'react';
import styled from 'styled-components';

export const Container = ({ children }) => (
    <div className="row">{children}</div>
)

const ContactHeader = styled.h1`
    text-align: center;
    margin-bottom: 30px;
    color: white;
    text-shadow: 1px 1px 2px black, 0 0 25px grey;
`;

export const PageHeader = ({ children }) => (
    <div className="col-sm-12">
        <ContactHeader>{children}</ContactHeader>
    </div>
)

export const Form = ({ children, onSubmit }) => (
    <form className="container" onSubmit={onSubmit} autoComplete="off" noValidate>
        {children}
    </form>
)

export const Formset = ({ children }) => (
    <div className="row">{children}</div>
)

const ContactIconSize = styled.i`
    font-size: 20px
`;

const InputGroupStyled = styled.div`
    padding: 10px;
`;

export const InputGroup = ({ children, icon, title }) => (
    <div className="col-sm-6">
        <InputGroupStyled className="input-group">
            <span className="input-group-addon gradient" data-toggle="tooltip" title={title}>
                <ContactIconSize className={"fa " + icon}></ContactIconSize>
            </span>
            {children}
        </InputGroupStyled>
    </div>
)

const FormGroupStyled = styled.div`
    padding-bottom: 0;
    padding-left: 10px;
    padding-right: 10px;
`;

export const FormGroup = ({ children }) => (
    <div className="row">
        <div className="col-sm-12">
            <FormGroupStyled className="form-group">{children}</FormGroupStyled>
        </div>
    </div>
)

const ButtonSubmitStyled = styled.button`
    margin-left: 10px;
    width: 150px;
`;

export const ContactSubmitButton = ({ not_submit }) => (
    <div className="row">
        <div className="col-sm-12">
            <ButtonSubmitStyled type="submit" className="btn btn-primary" disabled={not_submit}>
                <i className="fa fa-send"></i> Enviar
            </ButtonSubmitStyled>
        </div>
    </div>
)