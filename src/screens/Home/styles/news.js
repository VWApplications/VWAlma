import React from 'react';
import logo from 'asserts/img/logo.png';
import styled from 'styled-components';

export const PageHeader = ({ children }) => (
    <div className="page-header" id="news">
        <h1 className="white">{children}</h1>
    </div>
)

const ImgStyled = styled.img`
    @media screen and (min-width: 800px) {
        min-height: 300px;
        max-height: 300px;
    }
`;

export const NewsImage = ({ img, alt }) => {
    if (img)
        return <ImgStyled src={img} className="img-thumbnail img-responsive center-block" alt={alt} />
    else
        return <ImgStyled src={logo} className="img-thumbnail img-responsive center-block" alt="Sem imagem!" />
}

export const NewsTags = ({ children }) => (
    <div className="col-sm-4 pull-right">
        {children}
    </div>
)

const NewsTagStyled = styled.span`
    float: right;
    margin-top: 5px;
`;

export const NewsTag = ({ children }) => (
    <NewsTagStyled className="label label-primary">{children}</NewsTagStyled>
)

export const PanelShadow = styled.div`
    box-shadow: 10px 10px 5px grey;
`;

export const NewsTitle = ({ children, created_at }) => (
    <div className="col-sm-8">
        <h3>{children} <br />
            <small>({created_at})</small>
        </h3>
    </div>
)

export const NewsContent = ({ children }) => (
    <div className="row">
        <div className="col-sm-12">
            <p className="text-justify">{children}</p>
        </div>
    </div>
)

const NewsButtonStyled = styled.a`
    margin-left: 15px;
`;

export const NewsButton = ({ children, url }) => (
    <div className="row">
        <NewsButtonStyled href={url} className="btn btn-primary">{children}</NewsButtonStyled>
    </div>
)

export const PanelNews = ({ children, url }) => (
    <div className="pane panel-default">
        <div className="panel-body">
            <div className="row">{children}</div>
            <div className="row">
                <NewsButtonStyled href={url} className="btn btn-primary">Ver todas as notícias</NewsButtonStyled>
            </div>
        </div>
    </div>
)

export const PanelBody = ({ children, url }) => (
    <div className="col-sm-6">
        <PanelShadow className="panel panel-default panel-shadow">
            <div className="panel-body">
                {children}
            </div>

            <div className="panel-footer">
                <a href={url} className="btn btn-primary">Saiba mais.</a>
            </div>
        </PanelShadow>
    </div>
)