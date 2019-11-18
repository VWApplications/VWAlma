import { all, put, call, takeLatest, take, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { makeURL } from 'common/utils';
import { REMOVE_STUDENT_GROUP_SAGAS, LIST_GROUPS } from '../types';
import { fetchDisciplineAPI } from 'screens/Disciplines/api';
import { listGroupsSagas } from '../actions';
import { removeStudentGroupAPI } from '../api';
import { validateError } from 'common/utils';
import { successAlert } from 'common/alerts';

function* removeStudentGroup(action) {
    const { groupID, data } = action.payload;
    const discipline = yield select(state => state.router.location.state.discipline);

    try {
        const response = yield call(removeStudentGroupAPI, groupID, data);

        if (response.data.success) {
            successAlert("Estudante removido!", "Estudante removido com sucesso!");
            const pagination = yield select(state => state.student.pagination);
            yield put(listGroupsSagas(pagination.activePage));
            yield take([LIST_GROUPS]);

            const response = yield call(fetchDisciplineAPI, discipline.id);
            const newDiscipline = response.data;
            yield put(push(`/profile/${makeURL(newDiscipline.title)}/groups`, { discipline: newDiscipline }));
        }
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(REMOVE_STUDENT_GROUP_SAGAS, removeStudentGroup);
}

export default function* rootSaga() {
    yield all([watch()]);
}