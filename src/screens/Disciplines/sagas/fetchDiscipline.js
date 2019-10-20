import { all, put, call, takeLatest, select } from 'redux-saga/effects';
import { FETCH_DISCIPLINE_SAGAS } from '../types';
import { fetchDisciplineAction } from '../actions';
import { fetchDisciplineAPI } from '../api';
import { validateError } from 'common/utils';

function* fetchDiscipline() {
    const discipline = yield select(state => state.router.location.state.discipline);

    try {
        const response = yield call(fetchDisciplineAPI, discipline.id);
        const newDiscipline = response.data;

        yield put(fetchDisciplineAction(newDiscipline));
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