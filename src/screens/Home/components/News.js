import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { makeURL } from 'common/utils';
import {
    PageHeader, PanelBody, NewsImage, NewsTags,
    NewsTitle, NewsContent, NewsTag, PanelNews
} from '../styles/news';
import { news } from '../mocks/news';

class News extends Component {

    __redirectToNewsList() {
        const { dispatch } = this.props;
        dispatch(push("/news"));
    }

    __redirectToNewsDetail(news) {
        const { dispatch } = this.props;
        const location = {
            pathname: "/news/" + makeURL(news.title),
            state: news
        }
        dispatch(push(location.pathname, location.state));
    }

    render() {
        return (
            <div className="container">
                <PageHeader>Notícias</PageHeader>

                <PanelNews functionRedirect={() => this.__redirectToNewsList()}>
                    {news.length === 0 ? <div class="alert alert-info">Não há notícias disponível</div> : ""}
                    {news.slice(-2).map(lastNews => (
                        <PanelBody key={lastNews.id} onClick={() => this.__redirectToNewsDetail(lastNews)}>
                            <NewsImage img={lastNews.img} alt={lastNews.title} />
                            <div className="row">
                                <NewsTags>
                                    {lastNews.tags.length === 0 ? <NewsTag>Não há tags</NewsTag> : ""}
                                    {lastNews.tags.map(tag => (
                                        <NewsTag key={tag.id}>{tag.title}</NewsTag>
                                    ))}
                                </NewsTags>

                                <NewsTitle created_at={lastNews.created_at}>{lastNews.title}</NewsTitle>
                            </div>

                            <NewsContent>{lastNews.description}</NewsContent>
                        </PanelBody>
                    ))}
                </PanelNews>
            </div>
        )
    }
}

export default connect()(News);