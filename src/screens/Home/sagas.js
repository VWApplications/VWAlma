import { all, put, call, takeLatest } from 'redux-saga/effects';
import { LIST_NEWS_SAGAS, GET_NEWS_SAGAS } from './types';
import { listNewsAPI, getNewsAPI } from './api';
import { listNewsAction, getNewsAction } from './actions';
import { errorAlert } from 'common/alerts';

function* listNews(action) {
    const { activePage, queryString } = action.payload;

    try {
        let response = null;
        if (action.payload.queryString.includes("search=undefined"))
            response = yield call(listNewsAPI);
        else
            response = yield call(listNewsAPI, queryString);

        yield put(listNewsAction(response.data.results, activePage, response.data.count))
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
        watchGetNews()
    ]);
}