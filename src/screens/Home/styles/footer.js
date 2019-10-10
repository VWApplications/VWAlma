import React from 'react';
import styled from 'styled-components';

export const FooterStyled = styled.footer`
    padding-top: 10px;
    background-color: #292C33;
`;

export const Container = ({ children }) => (
    <div className="row">
        <div className="col-sm-12">
            {children}
        </div>
    </div>
)

export const Copyright = styled.p`
    color: white;
    padding-left: 10px;
`;

export const Icon = ({ src }) => (
    <i className={"fa " + src}></i>
)

export const Link = ({ children, href }) => (
    <a className="no-decoration" href={href} target="_blank" rel="noopener noreferrer">{children}</a>
)