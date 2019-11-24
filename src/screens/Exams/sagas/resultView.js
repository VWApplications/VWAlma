import { all, put, call, takeLatest, select } from 'redux-saga/effects';
import { RESULT_SAGAS } from '../types';
import { resultAction } from '../actions';
import { resultAPI } from '../api';
import { validateError } from 'common/utils';

function* sagas() {
    const section = yield select(state => state.router.location.state.section);

    try {
        const response = yield call(resultAPI, section.id);

        yield put(resultAction(response.data));
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(RESULT_SAGAS, sagas);
}

export default function* rootSaga() {
    yield all([watch()]);
}