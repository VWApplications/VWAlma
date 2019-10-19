import { all, put, call, takeLatest, take, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { RESET_DISCIPLINE_SAGAS, FETCH_DISCIPLINE } from '../types';
import { fetchDisciplineSagas } from '../actions';
import { resetDisciplineAPI } from '../api';
import { validateError } from 'common/utils';

function* resetDiscipline(action) {
    const { disciplineID, path } = action.payload;
    try {
        yield call(resetDisciplineAPI, disciplineID);

        yield put(fetchDisciplineSagas(disciplineID));

        yield take([FETCH_DISCIPLINE]);
        const discipline = yield select(state => state.discipline.obj);
        yield put(push(path, { discipline }));
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