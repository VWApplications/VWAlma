import { all, put, call, takeLatest } from 'redux-saga/effects';
import { FETCH_STUDENT_SAGAS } from '../types';
import { fetchStudentAction } from '../actions';
import { fetchStudentAPI } from '../api';
import { validateError } from 'common/utils';

function* fetchStudent() {
    try {
        const userResponse = yield call(fetchStudentAPI);

        yield put(fetchStudentAction(userResponse.data));
    } catch(error) {
        validateError(error);
    }
}

function* watchUser() {
    yield takeLatest(FETCH_STUDENT_SAGAS, fetchStudent);
}

export default function* rootSaga() {
    yield all([watchUser()]);
}