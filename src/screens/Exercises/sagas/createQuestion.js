import { all, put, call, takeLatest, take, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { makeURL } from 'common/utils';
import { CREATE_QUESTION_SAGAS, LIST_QUESTIONS } from '../types';
import { fetchDisciplineAPI } from 'screens/Disciplines/api';
import { fetchSectionAPI } from 'screens/Sections/api';
import { listQuestionsAction } from '../actions';
import { createQuestionAPI } from '../api';
import { validateError } from 'common/utils';
import { successAlert } from 'common/alerts';

function* createQuestion(action) {
    const data = action.payload;
    const { discipline, section } = yield select(state => state.router.location.state);
    data['section'] = section.id;

    try {
        yield call(createQuestionAPI, data);
        successAlert("Questão criada!", "Questão criada com sucesso!");

        const pagination = yield select(state => state.section.pagination);
        yield put(listQuestionsAction(pagination.activePage));
        yield take([LIST_QUESTIONS]);

        const disciplineResponse = yield call(fetchDisciplineAPI, discipline.id);
        const newDiscipline = disciplineResponse.data;
        const sectionResponse = yield call(fetchSectionAPI, section.id);
        const newSection = sectionResponse.data;

        yield put(push(`/profile/${makeURL(newDiscipline.title)}/sections`, { discipline: newDiscipline, section: newSection }));
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(CREATE_QUESTION_SAGAS, createQuestion);
}

export default function* rootSaga() {
    yield all([watch()]);
}