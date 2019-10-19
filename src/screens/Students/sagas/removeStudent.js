import { all, put, call, takeLatest, take } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { makeURL } from 'common/utils';
import { REMOVE_STUDENT_SAGAS, FETCH_STUDENT } from '../types';
import { fetchStudentAction } from '../actions';
import { removeStudentAPI } from '../api';
import { validateError } from 'common/utils';
import { successAlert } from 'common/alerts';

function* removeStudent(action) {
    const { discipline, studentID } = action.payload;

    try {
        const response = yield call(removeStudentAPI, discipline.id, studentID);

        if (response.data.success) {
            successAlert("Removeu!", "Aluno removido da turma com sucesso!")

            yield put(fetchStudentAction(studentID));
            yield take([FETCH_STUDENT]);
            yield put(push(`/profile/${makeURL(discipline.title)}/students`, { discipline }));
        }
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(REMOVE_STUDENT_SAGAS, removeStudent);
}

export default function* rootSaga() {
    yield all([watch()]);
}