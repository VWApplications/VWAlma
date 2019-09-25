import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import {
    PageHeader, PanelBody, NewsImage, NewsTags,
    NewsTitle, NewsContent, NewsTag, PanelNews
} from '../styles/news';

class News extends Component {

    __redirectToNewsList() {
        const { dispatch } = this.props;
        dispatch(push("/news", {"home": false}));
    }

    render() {
        return (
            <div className="container">
                <PageHeader>Notícias</PageHeader>

                <PanelNews functionRedirect={() => this.__redirectToNewsList()}>
                    {/* Fazer um loop das últimas duas noticias */}
                    <PanelBody url="#detalhes-da-noticia">
                        <NewsImage />
                        <div className="row">
                            <NewsTags>
                                {/* Percorre todas as tags da noticia */}
                                <NewsTag>Importante</NewsTag>
                            </NewsTags>

                            <NewsTitle created_at="25 de janeiro de 2019">Notícia 01</NewsTitle>
                        </div>

                        <NewsContent>Conteúdo muito doido da notícia.</NewsContent>
                    </PanelBody>
                </PanelNews>
            </div>
        )
    }
}

export default connect()(News);