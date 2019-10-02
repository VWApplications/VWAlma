import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Navbar from 'common/components/Navbar';
import {
    NewsTitle, NewsImage, NewsButton,
    NewsDescription, NewsTags, Container,
    Main, NewsPanel, Tag
} from '../styles/newsDetail';

class NewsDetail extends Component {

    __redirectToNewsList() {
        const { dispatch } = this.props;
        dispatch(push("/news"));
    }

    render() {
        const { location } = this.props;
        const news = location.state;

        return (
            <Container>
                <Navbar />

                <Main>
                    <NewsTitle content={news} />

                    <NewsPanel>
                        <NewsImage content={news} />
                        <NewsDescription content={news} />
                        <NewsTags>
                            {news.tags.length === 0 ? "Não há tags" : ""}
                            {news.tags.map((tag, index) => (
                                <Tag key={tag.id}> {tag.title}{news.tags.length !== index + 1 ? "," : ""}</Tag>
                            ))}
                        </NewsTags>
                        <NewsButton onClick={() => this.__redirectToNewsList()} />
                    </NewsPanel>
                </Main>
            </Container>
        )
    }
}

export default connect()(NewsDetail);