import { all, put, call, takeLatest, select } from 'redux-saga/effects';
import { go } from 'connected-react-router';
import { makeURL } from 'common/utils';
import { SUBMIT_SAGAS } from '../types';
import { submitExamAPI } from '../api';
import { validateError } from 'common/utils';
import { successAlert } from 'common/alerts';

function* submitExam(action) {
    const { data, form } = action.payload;
    const { discipline, section } = yield select(state => state.router.location.state);
    const { user } = yield select(state => state.account);
    data['section'] = section.id;
    data['student'] = user.id;

    try {
        yield call(submitExamAPI, data);
        successAlert("Submissão enviada!", "Respostas enviadas com sucesso!");
        setTimeout(form.reset);

        yield put(go(
            `/profile/${makeURL(discipline.title)}/sections/${makeURL(section.title)}/exercises`,
            { discipline, section }
        ));
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(SUBMIT_SAGAS, submitExam);
}

export default function* rootSaga() {
    yield all([watch()]);
}