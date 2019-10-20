import { all, put, call, takeLatest, take, select } from 'redux-saga/effects';
import { makeURL } from 'common/utils';
import { push } from 'connected-react-router';
import { TOOGLE_DISCIPLINE_STATUS_SAGAS, FETCH_DISCIPLINE } from '../types';
import { fetchDisciplineSagas } from '../actions';
import { toogleDisciplineStatusAPI } from '../api';
import { validateError } from 'common/utils';

function* toogleDisciplineStatus() {
    const discipline = yield select(state => state.router.location.state.discipline);

    try {
        yield call(toogleDisciplineStatusAPI, discipline.id);
        yield put(fetchDisciplineSagas(discipline.id));

        yield take([FETCH_DISCIPLINE]);
        const newDiscipline = yield select(state => state.discipline.obj);
        yield put(push(`/profile/${makeURL(discipline.title)}/detail`, { discipline: newDiscipline }));
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(TOOGLE_DISCIPLINE_STATUS_SAGAS, toogleDisciplineStatus);
}

export default function* rootSaga() {
    yield all([watch()]);
}