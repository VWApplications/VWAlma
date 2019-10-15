import React from 'react';
import styled from 'styled-components';

const BtnGroup = styled.div`
    width: 100%;

    > .btn {
        width: 100%;
        height: 100px;
        background-color: transparent;
        border: 1px solid #292C33;
        color: #B3B3B3;
        border-radius: 0;

        :hover, :focus {
            color: white;
            border: 1px solid #292C33;
            border-left: 5px solid #286090;
        }
    }
`;

export const Container = ({ children }) => (
    <BtnGroup className="btn-group-vertical">{children}</BtnGroup>
)


const LinkStyled = styled.button`
    padding-bottom: 25px;
    :first-child:not(:last-child) {
        border-top-right-radius: 0 !important;
        border-top-left-radius: 0 !important;
    }
`;

const Icon = styled.i`
    font-size: 48px;
    padding-top: 10px;
`;

export const SidebarLink = ({ children, icon, title, onClick }) => (
    <LinkStyled type="button"
        className="btn"
        onClick={onClick}
        data-toggle="tooltip"
        data-placement="right"
        title={title}
        data-intro={children}>
        <Icon className={"fa " + icon}></Icon>
        <p>{title}</p>
    </LinkStyled>
)