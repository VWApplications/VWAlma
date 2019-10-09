import { put, call, takeLatest, all } from 'redux-saga/effects';
import { LIST_NEWS_SAGAS } from '../types';
import { listNewsAPI } from '../api';
import { listNewsAction } from '../actions';
import { validateError } from 'common/utils';

function* listNews(action) {
    const { activePage, queryString } = action.payload;

    try {
        let response = null;
        if (queryString && queryString.includes("search=undefined"))
            response = yield call(listNewsAPI);
        else
            response = yield call(listNewsAPI, queryString);

        yield put(listNewsAction(response.data.results, activePage, response.data.count))
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(LIST_NEWS_SAGAS, listNews);
}

export default function* rootSaga() {
    yield all([watch()]);
}