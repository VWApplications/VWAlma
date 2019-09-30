import { all, put, call, takeLatest } from 'redux-saga/effects';
import { FETCH_USER_SAGAS } from '../types';
import { fetchUserAction } from '../actions';
import { getUserAPI } from '../api';
import { validateError } from 'common/utils';

function* fetchUser() {
    try {
        const userResponse = yield call(getUserAPI);

        yield put(fetchUserAction(userResponse.data));
    } catch(error) {
        validateError(error);
    }
}

function* watchUser() {
    yield takeLatest(FETCH_USER_SAGAS, fetchUser);
}

export default function* rootSaga() {
    yield all([watchUser()]);
}