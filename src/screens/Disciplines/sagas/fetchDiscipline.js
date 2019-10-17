import { all, put, call, takeLatest } from 'redux-saga/effects';
import { FETCH_DISCIPLINE_SAGAS } from '../types';
import { fetchDisciplineAction } from '../actions';
import { fetchDisciplineAPI } from '../api';
import { validateError } from 'common/utils';

function* fetchDiscipline(action) {
    try {
        const response = yield call(fetchDisciplineAPI, action.payload);
        const discipline = response.data;

        yield put(fetchDisciplineAction(discipline));
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(FETCH_DISCIPLINE_SAGAS, fetchDiscipline);
}

export default function* rootSaga() {
    yield all([watch()]);
}