import { all, put, call, takeLatest, take, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { makeURL } from 'common/utils';
import { validateError } from 'common/utils';
import { fetchDisciplineAPI } from 'screens/Disciplines/api';
import { listSectionsSagas } from '../actions';
import { DELETE_SECTION_SAGAS, LIST_SECTIONS } from '../types';
import { deleteSectionAPI } from '../api';

function* deleteSection(action) {
    const sectionID = action.payload;

    try {
        yield call(deleteSectionAPI, sectionID);

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
    yield takeLatest(DELETE_SECTION_SAGAS, deleteSection);
}

export default function* rootSaga() {
    yield all([watch()]);
}