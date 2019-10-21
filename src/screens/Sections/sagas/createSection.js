import { all, put, call, takeLatest, take, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { makeURL } from 'common/utils';
import { CREATE_SECTION_SAGAS, LIST_SECTIONS } from '../types';
import { fetchDisciplineAPI } from 'screens/Disciplines/api';
import { listSectionsSagas } from '../actions';
import { createSectionAPI } from '../api';
import { validateError } from 'common/utils';
import { successAlert } from 'common/alerts';

function* createSection(action) {
    const data = action.payload;
    const discipline = yield select(state => state.router.location.state.discipline);
    data['discipline'] = discipline.id;

    try {
        yield call(createSectionAPI, data);
        successAlert("Seção criada!", "Seção criada com sucesso!");

        const pagination = yield select(state => state.section.pagination);
        yield put(listSectionsSagas(pagination.activePage));
        yield take([LIST_SECTIONS]);

        const disciplineResponse = yield call(fetchDisciplineAPI, discipline.id);
        const newDiscipline = disciplineResponse.data;
        yield put(push(`/profile/${makeURL(newDiscipline.title)}/sections`, { discipline: newDiscipline }));
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(CREATE_SECTION_SAGAS, createSection);
}

export default function* rootSaga() {
    yield all([watch()]);
}