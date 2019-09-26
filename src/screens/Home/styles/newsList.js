import React from 'react';
import styled from 'styled-components';

export const PageHeader = ({ tag, onClick }) => (
    <div className="page-header">
        <h1 className="lighten-blue-grey">Notícias</h1>

        {tag ? 
            <div>
                <p className="lighten-blue-grey pull-right">{tag}</p>
                <button onClick={onClick} className="no-decoration btn-link">Voltar</button>
            </div>
        : ""}
    </div>
)

export const NewsTitle = ({ children, created_at }) => (
    <h2>
        {children}
        <small> ({created_at})</small>
    </h2>
)

export const NewsBody = ({ children, onClick }) => (
    <p className="text-justify">
        {children}
        <button onClick={onClick} className="no-decoration btn-link">Leia mais.</button>
    </p>
)

export const NewsTags = ({ children }) => (
    <p><i className="fa fa-tags"></i> tags:
        {children}
    </p>
)

export const NewsPanel = styled.div`
    margin-bottom: 0;
    margin-top: 10px;
`;

export const TagButton = styled.button`
    padding: 0;
`;