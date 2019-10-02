import { all, put, call, takeLatest } from 'redux-saga/effects';
import { GET_NEWS_SAGAS } from '../types';
import { getNewsAPI } from '../api';
import { getNewsAction } from '../actions';
import { validateError } from 'common/utils';

function* getNews(action) {
    const { payload } = action;

    try {
        const newsID = payload;
        const response = yield call(getNewsAPI, newsID);
        yield put(getNewsAction(response.data));
    } catch(error) {
        validateError(error);
    }
}

function* watchGetNews() {
    yield takeLatest(GET_NEWS_SAGAS, getNews);
}

export default function* rootSaga() {
    yield all([watchGetNews()]);
}