import { all, put, call, takeLatest, take, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { makeURL } from 'common/utils';
import { CREATE_GROUP_SAGAS, LIST_GROUPS } from '../types';
import { fetchDisciplineAPI } from 'screens/Disciplines/api';
import { listGroupsSagas } from '../actions';
import { createGroupAPI } from '../api';
import { validateError } from 'common/utils';
import { successAlert } from 'common/alerts';

function* createGroup(action) {
    const data = action.payload;
    const discipline = yield select(state => state.router.location.state.discipline);
    data['discipline'] = discipline.id;

    try {
        yield call(createGroupAPI, data);
        successAlert("Grupo criado!", "Grupo criado com sucesso!");

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
    yield takeLatest(CREATE_GROUP_SAGAS, createGroup);
}

export default function* rootSaga() {
    yield all([watch()]);
}