import React from 'react';
import styled from 'styled-components';

export const FooterStyled = styled.footer`
    padding-top: 10px;
    background-image: linear-gradient(#213038, #286090);
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

const LinkStyled = styled.a`
    color: white;
    :hover, :focus {
        color: white;
    }
`;

export const Link = ({ children, href }) => (
    <LinkStyled className="no-decoration" href={href} target="_blank" rel="noopener noreferrer">{children}</LinkStyled>
)