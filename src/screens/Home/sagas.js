import { all, put, call, select, takeLatest } from 'redux-saga/effects';
import { LIST_NEWS_SAGAS, GET_NEWS_SAGAS } from './types';
import { listNewsAPI, getNewsAPI } from './api';
import { listNewsAction, getNewsAction } from './actions';
import { errorAlert } from 'common/alerts';

function* listNews() {
    try {
        const news = yield select(state => state.home.news_list);

        if(news.length === 0) {
            const response = yield call(listNewsAPI);
            yield put(listNewsAction(response.data.results))
        }
    } catch(error) {
        console.error(error);
        errorAlert("Ops...", error);
    }
}

function* watchListNews() {
    yield takeLatest(LIST_NEWS_SAGAS, listNews);
}

function* getNews(action) {
    const { payload } = action;

    try {
        const newsID = payload;
        const response = yield call(getNewsAPI, newsID);
        yield put(getNewsAction(response.data));
    } catch(error) {
        console.error(error);
        errorAlert("Ops...", error);
    }
}

function* watchGetNews() {
    yield takeLatest(GET_NEWS_SAGAS, getNews);
}

export default function* rootSaga() {
    yield all([
        watchListNews(),
        watchGetNews(),
    ]);
}