import { all, put, call, takeLatest } from 'redux-saga/effects';
import { LIST_ALL_DISCIPLINE_SAGAS } from '../types';
import { listAllDisciplinesAction } from '../actions';
import { getAllDisciplinesAPI } from '../api';
import { validateError } from 'common/utils';

function* listAllDisciplines(action) {
    const { activePage, queryString } = action.payload;

    try {
        const response = yield call(getAllDisciplinesAPI, queryString);

        yield put(listAllDisciplinesAction(response.data.results, activePage, response.data.count));
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(LIST_ALL_DISCIPLINE_SAGAS, listAllDisciplines);
}

export default function* rootSaga() {
    yield all([watch()]);
}