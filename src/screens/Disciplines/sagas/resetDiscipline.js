import { all, put, call, takeLatest, take, select } from 'redux-saga/effects';
import { makeURL } from 'common/utils';
import { push } from 'connected-react-router';
import { RESET_DISCIPLINE_SAGAS, FETCH_DISCIPLINE } from '../types';
import { fetchDisciplineSagas } from '../actions';
import { resetDisciplineAPI } from '../api';
import { validateError } from 'common/utils';

function* resetDiscipline() {
    const discipline = yield select(state => state.router.location.state.discipline);

    try {
        yield call(resetDisciplineAPI, discipline.id);
        yield put(fetchDisciplineSagas(discipline.id));

        yield take([FETCH_DISCIPLINE]);
        const newDiscipline = yield select(state => state.discipline.obj);
        yield put(push(`/profile/${makeURL(discipline.title)}/detail`, { discipline: newDiscipline }));
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(RESET_DISCIPLINE_SAGAS, resetDiscipline);
}

export default function* rootSaga() {
    yield all([watch()]);
}