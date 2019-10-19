import { all, put, call, takeLatest } from 'redux-saga/effects';
import { LIST_STUDENTS_SAGAS } from '../types';
import { listStudentsAction } from '../actions';
import { getStudentsAPI } from '../api';
import { validateError } from 'common/utils';

function* listStudents(action) {
    const { discipline, activePage, queryString } = action.payload;

    try {
        const response = yield call(getStudentsAPI, discipline.id, queryString);

        yield put(listStudentsAction(response.data.results, activePage, response.data.count));
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(LIST_STUDENTS_SAGAS, listStudents);
}

export default function* rootSaga() {
    yield all([watch()]);
}