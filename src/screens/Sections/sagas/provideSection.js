import { all, put, call, takeLatest, take, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { makeURL } from 'common/utils';
import { validateError } from 'common/utils';
import { fetchDisciplineAPI } from 'screens/Disciplines/api';
import { listSectionsSagas } from '../actions';
import { PROVIDE_SECTION_SAGAS, LIST_SECTIONS } from '../types';
import { provideSectionAPI } from '../api';

function* provideSection(action) {
    const sectionID = action.payload;

    try {
        yield call(provideSectionAPI, sectionID);

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
    yield takeLatest(PROVIDE_SECTION_SAGAS, provideSection);
}

export default function* rootSaga() {
    yield all([watch()]);
}