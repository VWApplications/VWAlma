import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Navbar from 'common/components/Navbar';
import {
    PageHeader, NewsTitle, NewsImage,
    NewsDescription, NewsTags, NewsButton
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
            <div>
                <Navbar />

                <main>
                    <div className="container">
                        <NewsTitle content={news} />

                        <div className="panel panel-default">
                            <div className="panel-body">
                                <NewsImage content={news} />
                                <NewsDescription content={news} />
                                <NewsTags>
                                    {news.tags.length === 0 ? "Não há tags" : ""}
                                    {news.tags.map((tag, index) => (
                                        <span key={tag.id}> {tag.title}{news.tags.length !== index + 1 ? "," : ""}</span>
                                    ))}
                                </NewsTags>
                                <NewsButton onClick={() => this.__redirectToNewsList()} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default connect()(NewsDetail);