import React from 'react';
import styled from 'styled-components';

export const Main = ({ children }) => (
    <main>{children}</main>
)

const Login = styled.div`
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

export const Container = ({ children }) => (
    <Login>
        <h1>Cadastro</h1>
        {children}
    </Login>
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
`;

export const FormGroup = ({ children, icon }) => (
    <Group>
        <div className="input-group">
            <Icon className="input-group-addon">
                <i className={"white icon-md fa " + icon}></i>
            </Icon>
            {children}
        </div>
    </Group>
)

const RegisterButton = styled.button`
    margin-top: 10px;
`;

export const SubmitButton = ({ disabled, children }) => (
    <RegisterButton className="btn btn-lg btn-primary btn-block" type="submit" disabled={disabled}>
        {children}
    </RegisterButton>
)

export const Line = () => (<hr />)