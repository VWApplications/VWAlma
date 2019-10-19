import { all, put, call, takeLatest, take, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { TOOGLE_DISCIPLINE_STATUS_SAGAS, FETCH_DISCIPLINE } from '../types';
import { fetchDisciplineSagas } from '../actions';
import { toogleDisciplineStatusAPI } from '../api';
import { validateError } from 'common/utils';

function* toogleDisciplineStatus(action) {
    const { disciplineID, path } = action.payload;
    try {
        yield call(toogleDisciplineStatusAPI, disciplineID);

        yield put(fetchDisciplineSagas(disciplineID));

        yield take([FETCH_DISCIPLINE]);
        const discipline = yield select(state => state.discipline.obj);
        yield put(push(path, { discipline }));
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