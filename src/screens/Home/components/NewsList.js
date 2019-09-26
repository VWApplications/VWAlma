import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { makeURL } from 'common/utils';
import Navbar from 'common/components/Navbar';
import { PageHeader, NewsTitle, NewsBody, NewsTags, NewsPanel, TagButton } from '../styles/newsList';
import { listNewsSagas } from '../actions';

class NewsList extends Component {

    constructor(props) {
        super(props);
        this.state = {tag: ""}
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(listNewsSagas());
    }

    __cleanTagFilter() {
        this.setState({tag: ""})
        console.log("Dispatch para pegar todos as noticias")
    }

    __redirectToDetail(news) {
        const { dispatch } = this.props;
        const location = {pathname: "/news/" + makeURL(news.title), state: news}
        dispatch(push(location.pathname, location.state));
    }

    __getTag(tag) {
        this.setState({tag: tag.title})
        console.log("Dispatch para filtrar as noticias pela tag passada")
    }

    render() {
        const { news_list } = this.props;

        return (
            <div>
                <Navbar />

                <main>
                    <div className="container">
                        <PageHeader tag={this.state.tag} onClick={() => this.__cleanTagFilter()} />

                        <form method="GET" acceptCharset="utf-8">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="q_info"
                                    placeholder="Pesquisa"
                                />

                                <div className="input-group-btn">
                                    <button className="btn btn-primary btn-border" type="submit">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </form>

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

                        <ul className="pagination">
                            <li className="waves-effect">
                                <a href="#proximo">
                                    <span className="fa fa-chevron-left"></span>
                                </a>
                            </li>

                            {/* Lista de paginas */}
                            <li className="waves-effect active">
                                <a href="#pagina-1">1</a>
                            </li>

                            <li className="waves-effect">
                                <a href="#voltar">
                                    <span className="fa fa-chevron-right"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { news_list } = state.home;
    return { news_list };
}

export default connect(mapStateToProps)(NewsList);