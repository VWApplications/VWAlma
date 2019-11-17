import { all, put, call, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { makeURL } from 'common/utils';
import { validateError } from 'common/utils';
import { fetchDisciplineAPI } from 'screens/Disciplines/api';
import { FINISH_SECTION_SAGAS } from '../types';
import { finishSectionAPI, fetchSectionAPI } from '../api';
import { successAlert } from 'common/alerts';

function* finishSection() {
    const discipline = yield select(state => state.router.location.state.discipline);
    const section = yield select(state => state.router.location.state.section);

    try {
        yield call(finishSectionAPI, section.id);
        successAlert("Seção finalizada!", "Seção finalizada com sucesso!");

        const disciplineResponse = yield call(fetchDisciplineAPI, discipline.id);
        const newDiscipline = disciplineResponse.data;
        const sectionResponse = yield call(fetchSectionAPI, section.id);
        const newSection = sectionResponse.data;
        yield put(push(
            `/profile/${makeURL(newDiscipline.title)}/sections/${makeURL(newSection.title)}/detail`,
            { discipline: newDiscipline, section: newSection }
        ));
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(FINISH_SECTION_SAGAS, finishSection);
}

export default function* rootSaga() {
    yield all([watch()]);
}