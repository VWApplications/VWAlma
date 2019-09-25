import React, { Component } from 'react';
import {
    PageHeader, PanelBody, NewsImage, NewsTags,
    NewsTitle, NewsContent, NewsTag, PanelNews
} from '../styles/news';

class News extends Component {
    render() {
        return (
            <div className="container">
                <PageHeader>Notícias</PageHeader>

                <PanelNews url="#lista-de-noticias">
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

export default News;