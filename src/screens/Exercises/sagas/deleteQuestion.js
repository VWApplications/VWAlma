import { all, put, call, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { makeURL } from 'common/utils';
import { fetchDisciplineAPI } from 'screens/Disciplines/api';
import { fetchSectionAPI } from 'screens/Sections/api';
import { DELETE_QUESTION_SAGAS } from '../types';
import { deleteQuestionAPI } from '../api';
import { validateError } from 'common/utils';

function* deleteQuestion(action) {
    const { discipline, section } = yield select(state => state.router.location.state);

    try {
        yield call(deleteQuestionAPI, action.payload);

        const disciplineResponse = yield call(fetchDisciplineAPI, discipline.id);
        const newDiscipline = disciplineResponse.data;
        const sectionResponse = yield call(fetchSectionAPI, section.id);
        const newSection = sectionResponse.data;
        yield put(push(
            `/profile/${makeURL(newDiscipline.title)}/sections/${makeURL(newSection.title)}/exercises`,
            { discipline: newDiscipline, section: newSection }
        ));
        window.location.reload();
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(DELETE_QUESTION_SAGAS, deleteQuestion);
}

export default function* rootSaga() {
    yield all([watch()]);
}