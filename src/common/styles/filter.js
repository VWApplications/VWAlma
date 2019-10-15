import React from 'react';
import styled from 'styled-components';

const StyledLink = styled.button`
    text-align: left;
    :hover {
        text-decoration: none;
    }
`;

export const FilterLink = ({ children, onClick }) => (
    <StyledLink className="btn btn-link btn-block" type="button" onClick={onClick}>
        {children}
    </StyledLink>
)

export const FilterItem = ({ children }) => (
    <li>{children}</li>
)

export const FilterStyled = ({ title, icon, children, onClick }) => {
    return (
        <div className="dropdown input-group-btn">
            <button className="btn btn-primary dropdown-toggle btn-border" type="button" data-toggle="dropdown" onClick={onClick}>
                <span className={"fa " + icon}></span> <b>{title}</b>
            </button>

            <ul className="dropdown-menu">
                {children}
            </ul>
        </div>
    )
}
