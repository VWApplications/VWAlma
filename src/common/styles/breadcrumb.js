import React from 'react';
import styled from 'styled-components';

const Navigation = styled.div`
    background-color: #343841;

    > p {
        padding-top: 4px;
        padding-left: 15px;
        padding-right: 15px;
        color: #B3B3B3;
        margin 0;
    }
`;

const ContainerFixed = styled.div`
    position: fixed;
    width: 100%;
`;

export const Container = ({ children }) => (
    <ContainerFixed className="row">
        <Navigation className="col-sm-12">{children}</Navigation>
    </ContainerFixed>
)

export const BreadcrumbStyled = styled.ul`
    padding: 0;
    margin-bottom: unset;
    list-style: none;
    background-color: transparent;
    border-radius: unset;
`;

const ButtonLink = styled.button`
    color: #B3B3B3;
    padding-left: 0;
    padding-right: 0;
    padding-top: 2px;
    
    :hover, :focus {
        color: white;
        text-decoration: none;
    }
`;

export const BreadLink = ({ children, onClick }) => (
    <li><ButtonLink type="button" className="btn btn-link" onClick={onClick}>{children}</ButtonLink></li>
)

export const Welcome = ({ children }) => (
    <p className="pull-right">
        Bem Vindo {children} <i className="fa fa-child"></i>
    </p>
)

export const Space = styled.div`
    margin-top: 34px;
`;