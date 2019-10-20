import { all, put, call, takeLatest, take, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { makeURL } from 'common/utils';
import { ADD_STUDENT_SAGAS, LIST_STUDENTS } from '../types';
import { fetchDisciplineAPI } from 'screens/Disciplines/api';
import { listStudentsSagas } from '../actions';
import { addStudentAPI } from '../api';
import { validateError } from 'common/utils';
import { successAlert } from 'common/alerts';

function* addStudent(action) {
    const { data, queryString } = action.payload;
    const discipline = yield select(state => state.router.location.state.discipline);

    try {
        const response = yield call(addStudentAPI, discipline.id, data);

        if (response.data.success) {
            successAlert("Adicionado!", "Aluno adicionado a turma com sucesso!")

            const pagination = yield select(state => state.student.pagination);
            yield put(listStudentsSagas(pagination.activePage, queryString));
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
    yield takeLatest(ADD_STUDENT_SAGAS, addStudent);
}

export default function* rootSaga() {
    yield all([watch()]);
}