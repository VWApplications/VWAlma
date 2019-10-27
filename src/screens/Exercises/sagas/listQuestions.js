import { all, put, call, takeLatest, select } from 'redux-saga/effects';
import { stringify } from 'query-string';
import { LIST_QUESTIONS_SAGAS } from '../types';
import { listQuestionsAction } from '../actions';
import { getQuestionsAPI } from '../api';
import { validateError } from 'common/utils';

function* listQuestions(action) {
    const { activePage, test } = action.payload;

    let queryString = stringify({page: activePage});
    const section = yield select(state => state.router.location.state.section);
    const data = {sectionID: section.id, test};

    try {
        const response = yield call(getQuestionsAPI, data, queryString);

        yield put(listQuestionsAction(response.data.results, activePage, response.data.count));
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(LIST_QUESTIONS_SAGAS, listQuestions);
}

export default function* rootSaga() {
    yield all([watch()]);
}