import { all, put, call, takeLatest, take, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { makeURL } from 'common/utils';
import { validateError } from 'common/utils';
import { successAlert } from 'common/alerts';
import { fetchDisciplineAPI } from 'screens/Disciplines/api';
import { listGroupsSagas } from '../actions';
import { UPDATE_GROUP_SAGAS, LIST_GROUPS } from '../types';
import { updateGroupAPI } from '../api';

function* updateGroup(action) {
    const { discipline, data, groupID } = action.payload;

    try {
        yield call(updateGroupAPI, data, groupID);
        successAlert("Grupo atualizado!", "Grupo atualizado com sucesso!");

        const pagination = yield select(state => state.group.pagination);
        yield put(listGroupsSagas(discipline, pagination.activePage, "page=" + pagination.activePage));
        yield take([LIST_GROUPS]);

        const disciplineResponse = yield call(fetchDisciplineAPI, discipline.id);
        const newDiscipline = disciplineResponse.data;
        yield put(push(`/profile/${makeURL(newDiscipline.title)}/groups`, { discipline: newDiscipline }));
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(UPDATE_GROUP_SAGAS, updateGroup);
}

export default function* rootSaga() {
    yield all([watch()]);
}