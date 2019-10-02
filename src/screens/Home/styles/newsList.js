import React from 'react';
import styled from 'styled-components';

export const Container = ({ children }) => (
    <div>{children}</div>
)

export const Main = ({ children }) => (
    <main><div className="container">{children}</div></main>
)

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

export const NewsPanelStyled = styled.div`
    margin-bottom: 0;
    margin-top: 10px;
`;

export const NewsPanel = ({ children }) => (
    <NewsPanelStyled className="panel panel-default">
        <div className="panel-body">{children}</div>
    </NewsPanelStyled>
)

export const News = ({ children, id }) => (
    <div key={id}>{children}</div>
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

export const Tag = ({ children, id }) => (
    <span key={id}>{children}</span>
)

export const TagButton = styled.button`
    padding: 0;
`;