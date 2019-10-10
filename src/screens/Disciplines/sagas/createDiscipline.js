import { all, put, call, takeLatest, take } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { CREATE_DISCIPLINE_SAGAS, LIST_DISCIPLINE } from '../types';
import { listDisciplinesSagas } from '../actions';
import { createDisciplineAPI } from '../api';
import { validateError } from 'common/utils';
import { successAlert } from 'common/alerts';

function* createDiscipline(action) {
    try {
        const response = yield call(createDisciplineAPI, action.payload);

        successAlert("Disciplina criada!", `Disciplina ${response.data.title} criada com sucesso!`)

        yield put(listDisciplinesSagas(1));

        yield take([LIST_DISCIPLINE]);
        yield put(push("/profile"));
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(CREATE_DISCIPLINE_SAGAS, createDiscipline);
}

export default function* rootSaga() {
    yield all([watch()]);
}