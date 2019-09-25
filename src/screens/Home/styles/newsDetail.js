import React from 'react';
import styled from 'styled-components';

const TitleLink = styled.a`
    color: #efe1e1;

    :hover, :focus {
        color: white;
    }
`;

export const NewsTitle = ({ content }) => (
    <div>
        <h2>
            {content.link ?
                <div>
                    <TitleLink href={content.link} className="no-decoration" target="_blank" rel="noopener noreferrer">{content.title}</TitleLink>
                    <br />
                </div>
            : <p>{content.title}</p>}
            <small>({ content.created_at })</small>
        </h2>
        <hr />
    </div>
)

export const NewsImage = ({ content }) => (
    <div>
        {content.image ?
            <div>
                <img src={content.image.url} className="img-thumbnail img-responsive center-block" alt="news" />
                <br />
            </div>
        : ""}
    </div>
)

export const NewsDescription = ({ content }) => (
    <p className="text-justify text-muted">
        {content.description}
    </p>
)

export const NewsTags = ({ children }) => (
    <p className="pull-right">
        <i className="fa fa-tags"></i> tags:
        {children}
    </p>
)

export const NewsButton = ({ onClick }) => (
    <button className="pull-left no-decoration btn-link" onClick={onClick}>
        <i className="fa fa-chevron-left"></i> Voltar
    </button>
)