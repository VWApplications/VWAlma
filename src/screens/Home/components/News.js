import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { makeURL } from 'common/utils';
import {
    PageHeader, PanelBody, NewsImage, NewsTags,
    NewsTitle, NewsContent, NewsTag, PanelNews,
    Container, AlertInfo, NewsRow
} from '../styles/news';
import { listNewsSagas } from '../actions';

class News extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(listNewsSagas());
    }

    __redirectToNewsList() {
        const { dispatch } = this.props;
        dispatch(push("/news"));
    }

    __redirectToNewsDetail(news) {
        const { dispatch } = this.props;
        const location = {pathname: "/news/" + makeURL(news.title), state: news}
        dispatch(push(location.pathname, location.state));
    }

    render() {
        const { news_list } = this.props;

        return (
            <Container>
                <PageHeader>Notícias</PageHeader>

                <PanelNews functionRedirect={() => this.__redirectToNewsList()}>
                    {news_list.length === 0 ? <AlertInfo>Não há notícias disponível.</AlertInfo> : ""}
                    {news_list.slice(-2).map(lastNews => (
                        <PanelBody key={lastNews.id} onClick={() => this.__redirectToNewsDetail(lastNews)}>
                            <NewsImage img={lastNews.img} alt={lastNews.title} />
                            <NewsRow>
                                <NewsTags>
                                    {lastNews.tags.length === 0 ? <NewsTag>Não há tags</NewsTag> : ""}
                                    {lastNews.tags.map(tag => (
                                        <NewsTag key={tag.id}>{tag.title}</NewsTag>
                                    ))}
                                </NewsTags>

                                <NewsTitle created_at={lastNews.created_at}>{lastNews.title}</NewsTitle>
                            </NewsRow>

                            <NewsContent>{lastNews.description}</NewsContent>
                        </PanelBody>
                    ))}
                </PanelNews>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    const { news_list } = state.home;
    return { news_list };
}

export default connect(mapStateToProps)(News);