import { all, put, call, takeLatest, take } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { DELETE_DISCIPLINE_SAGAS, LIST_DISCIPLINE } from '../types';
import { listDisciplinesSagas } from '../actions';
import { deleteDisciplineAPI } from '../api';
import { validateError } from 'common/utils';
import { successAlert } from 'common/alerts';

function* deleteDiscipline(action) {
    try {
        yield call(deleteDisciplineAPI, action.payload);
        successAlert("Disciplina deletada!", "Disciplina deletada com sucesso!");

        yield put(listDisciplinesSagas(1));

        yield take([LIST_DISCIPLINE]);
        yield put(push("/profile"));
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(DELETE_DISCIPLINE_SAGAS, deleteDiscipline);
}

export default function* rootSaga() {
    yield all([watch()]);
}