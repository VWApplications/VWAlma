import React, { Component } from 'react';
import { connect } from 'react-redux';
import {reset} from 'redux-form';
import { push } from 'connected-react-router';
import { makeURL, moveToTop, getQueryString } from 'common/utils';
import Navbar from 'common/components/Navbar';
import CustomPagination from 'common/components/Pagination';
import { PageHeader, NewsTitle, NewsBody, NewsTags, NewsPanel, TagButton } from '../styles/newsList';
import { listNewsSagas } from '../actions';
import SearchForm from 'common/components/Search';

class NewsList extends Component {

    constructor(props) {
        super(props);
        this.state = {queryString: "page=1", tag: ""}
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(listNewsSagas(1, this.state.queryString));
    }

    __cleanTagFilter() {
        const { dispatch, pagination } = this.props;
        this.setState({tag: ""});
        const queryString = "page=" + pagination.activePage;
        this.setState({queryString});
        dispatch(listNewsSagas(pagination.activePage, queryString));
    }

    __redirectToDetail(news) {
        const { dispatch } = this.props;
        const location = {pathname: "/news/" + makeURL(news.title), state: news}
        dispatch(push(location.pathname, location.state));
    }

    __getTag(tag) {
        const { dispatch } = this.props;
        moveToTop();
        this.setState({tag: tag.title});
        const queryString = getQueryString(this.state.queryString, tag.title, "tag");
        this.setState({queryString});
        dispatch(listNewsSagas(1, queryString));
    }

    __search(data) {
        const { dispatch } = this.props;
        const queryString = getQueryString(this.state.queryString, data.search, "search");
        this.setState({queryString});
        dispatch(reset("SearchForm"));
        dispatch(listNewsSagas(1, queryString));
    }

    render() {
        const { news_list, pagination } = this.props;

        return (
            <div>
                <Navbar />

                <main>
                    <div className="container">
                        <PageHeader tag={this.state.tag} onClick={() => this.__cleanTagFilter()} />

                        <SearchForm onSubmit={(data) => this.__search(data)} />

                        <NewsPanel className="panel panel-default">
                            <div className="panel-body">
                                {news_list.length === 0 ? "Não há notícias disponível." : ""}
                                {news_list.map((currentNews, index) => (
                                    <div key={currentNews.id}>
                                        <NewsTitle created_at={currentNews.created_at}>
                                            {currentNews.title}
                                        </NewsTitle>

                                        <NewsBody onClick={() => this.__redirectToDetail(currentNews)}>
                                            {currentNews.description}
                                        </NewsBody>

                                        <NewsTags>
                                            {currentNews.tags.length === 0 ? " Não há tags" : ""}
                                            {currentNews.tags.map((tag, index) => (
                                                <span key={tag.id}>
                                                    <TagButton onClick={() => this.__getTag(tag)} className="no-decoration btn-link">
                                                        {tag.title}{currentNews.tags.length !== index + 1 ? "," : ""}
                                                    </TagButton>
                                                </span>
                                            ))}
                                        </NewsTags>

                                        {news_list.length !== index + 1 ? <hr /> : ""}
                                    </div>
                                ))}
                            </div>
                        </NewsPanel>
                        <CustomPagination
                            pagination={pagination}
                            listObjectAction={listNewsSagas}
                        />
                    </div>
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { news_list, pagination } = state.home;
    return { news_list, pagination };
}

export default connect(mapStateToProps)(NewsList);