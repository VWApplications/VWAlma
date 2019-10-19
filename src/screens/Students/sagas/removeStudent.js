import { all, put, call, takeLatest, take, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { makeURL } from 'common/utils';
import { REMOVE_STUDENT_SAGAS, LIST_STUDENTS } from '../types';
import { fetchDisciplineAPI } from 'screens/Disciplines/api';
import { listStudentsSagas } from '../actions';
import { removeStudentAPI } from '../api';
import { validateError } from 'common/utils';
import { successAlert } from 'common/alerts';

function* removeStudent(action) {
    const { discipline, studentID, queryString } = action.payload;

    try {
        const response = yield call(removeStudentAPI, discipline.id, studentID);

        if (response.data.success) {
            successAlert("Removeu!", "Aluno removido da turma com sucesso!")

            const pagination = yield select(state => state.student.pagination);
            yield put(listStudentsSagas(discipline, pagination.activePage, queryString));
            yield take([LIST_STUDENTS]);

            const response = yield call(fetchDisciplineAPI, discipline.id);
            const newDiscipline = response.data;
            yield put(push(`/profile/${makeURL(newDiscipline.title)}/students`, { discipline: newDiscipline }));
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