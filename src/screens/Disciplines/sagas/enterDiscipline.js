import { all, put, call, takeLatest, take } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { ENTER_DISCIPLINE_SAGAS, LIST_DISCIPLINE } from '../types';
import { listDisciplinesSagas } from '../actions';
import { enterDisciplineAPI } from '../api';
import { validateError } from 'common/utils';
import { successAlert } from 'common/alerts';

function* enterDiscipline(action) {
    const { data, disciplineID } = action.payload;

    try {
        const response = yield call(enterDisciplineAPI, data, disciplineID);

        if (response.data.success) {
            successAlert("Entrou!", `Você entrou na disciplina!`)

            yield put(listDisciplinesSagas(1));
            yield take([LIST_DISCIPLINE]);
            yield put(push("/profile"));
        }
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(ENTER_DISCIPLINE_SAGAS, enterDiscipline);
}

export default function* rootSaga() {
    yield all([watch()]);
}