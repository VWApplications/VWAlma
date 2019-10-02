import { all, put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {  RESET_PASSWORD_SAGAS } from '../types';
import { resetPasswordAPI } from '../api';
import { validateError } from 'common/utils';
import { successAlert } from 'common/alerts';

function* resetPassword(action) {
    const { payload } = action;

    try {
        yield call(resetPasswordAPI, payload);

        successAlert("Email enviado", "A chave para resetar a senha foi enviado no seu email.");

        yield put(push('/create-new-password'));
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(RESET_PASSWORD_SAGAS, resetPassword);
}

export default function* rootSaga() {
    yield all([watch()]);
}