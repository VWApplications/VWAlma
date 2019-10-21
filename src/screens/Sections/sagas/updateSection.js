import { all, put, call, takeLatest, take, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { makeURL } from 'common/utils';
import { validateError } from 'common/utils';
import { successAlert } from 'common/alerts';
import { fetchDisciplineAPI } from 'screens/Disciplines/api';
import { listSectionsSagas } from '../actions';
import { UPDATE_SECTION_SAGAS, LIST_SECTIONS } from '../types';
import { updateSectionAPI } from '../api';

function* updateSection(action) {
    const { data, sectionID } = action.payload;

    try {
        yield call(updateSectionAPI, data, sectionID);
        successAlert("Seção atualizada!", "Seção atualizada com sucesso!");

        const pagination = yield select(state => state.section.pagination);
        const discipline = yield select(state => state.router.location.state.discipline);
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
    yield takeLatest(UPDATE_SECTION_SAGAS, updateSection);
}

export default function* rootSaga() {
    yield all([watch()]);
}