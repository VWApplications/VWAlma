import React from 'react';
import styled from 'styled-components';

export const Main = ({ children }) => (
    <main>{children}</main>
)

const ContainerStyled = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: 100px;
    margin-left: -150px;
    width:300px;

    h1 {
        color: #fff;
        text-shadow: 0 0 10px rgba(0,0,0,0.3);
        letter-spacing: 1px;
        text-align: center;
    }
`;

export const Container = ({ children, title }) => (
    <ContainerStyled>
        <h1>{title}</h1>
        {children}
    </ContainerStyled>
)

export const FormStyled = ({ children, onSubmit }) => (
    <form onSubmit={onSubmit} noValidate>
        {children}
    </form>
)

const Group = styled.div`
    margin-top: 5px;
`;

const Icon = styled.span`
    background-color: rgba(0,0,0,0.3);
    border: 1px solid rgba(0,0,0,0.3);
    max-width: 35px;
    min-width: 35px;
`;

export const FormGroup = ({ children, icon }) => (
    <Group>
        <div className="input-group">
            <Icon className="input-group-addon">
                <i className={"white fa " + icon}></i>
            </Icon>
            {children}
        </div>
    </Group>
)

const ResetButton = styled.button`
    margin-top: 10px;
`;

export const SubmitButton = ({ disabled, children }) => (
    <ResetButton className="btn btn-lg btn-primary btn-block" type="submit" disabled={disabled}>
        {children}
    </ResetButton>
)
