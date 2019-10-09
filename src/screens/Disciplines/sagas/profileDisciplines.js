import { all, put, call, takeLatest } from 'redux-saga/effects';
import { LIST_DISCIPLINE_SAGAS } from '../types';
import { listDisciplinesAction } from '../actions';
import { getDisciplinesAPI } from '../api';
import { validateError } from 'common/utils';

function* listDisciplines(action) {
    const { activePage, queryString } = action.payload;

    try {
        const response = yield call(getDisciplinesAPI, queryString);

        yield put(listDisciplinesAction(response.data.results, activePage, response.data.count));
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(LIST_DISCIPLINE_SAGAS, listDisciplines);
}

export default function* rootSaga() {
    yield all([watch()]);
}