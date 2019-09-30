import { all, put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { UPDATE_PASSWORD_SAGAS } from '../types';
import { updatePasswordAPI } from '../api';
import { validateError } from 'common/utils';
import { successAlert } from 'common/alerts';

function* updatePassword(action) {
    const { payload } = action;

    try {

        yield call(updatePasswordAPI, payload);

        successAlert("Senha atualizada", "Senha atualizada com sucesso.");

        yield put(push('/profile'));
    } catch(error) {
        validateError(error);
    }
}

function* watchUpdatePassword() {
    yield takeLatest(UPDATE_PASSWORD_SAGAS, updatePassword);
}

export default function* rootSaga() {
    yield all([watchUpdatePassword()]);
}