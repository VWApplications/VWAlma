import { all, put, call, takeLatest, take } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { UPDATE_DISCIPLINE_SAGAS, LIST_DISCIPLINE } from '../types';
import { listDisciplinesSagas } from '../actions';
import { updateDisciplineAPI } from '../api';
import { validateError } from 'common/utils';
import { successAlert } from 'common/alerts';

function* updateDiscipline(action) {
    const { data, disciplineID } = action.payload;

    try {
        const response = yield call(updateDisciplineAPI, data, disciplineID);

        successAlert("Disciplina atualizada!", `Disciplina ${response.data.title} atualizada com sucesso!`)

        yield put(listDisciplinesSagas(1));

        yield take([LIST_DISCIPLINE]);
        yield put(push("/profile"));
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(UPDATE_DISCIPLINE_SAGAS, updateDiscipline);
}

export default function* rootSaga() {
    yield all([watch()]);
}