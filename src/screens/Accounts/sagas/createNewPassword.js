import { all, put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { CREATE_NEW_PASSWORD_SAGAS } from '../types';
import { createNewPasswordAPI } from '../api';
import { validateError } from 'common/utils';
import { successAlert } from 'common/alerts';

function* createNewPassword(action) {
    const { payload } = action;

    try {
        yield call(createNewPasswordAPI, payload);

        successAlert("Senha atualizada", "A senha foi atualizada com sucesso!");

        yield put(push('/login'));
    } catch(error) {
        validateError(error);
    }
}

function* watch() {
    yield takeLatest(CREATE_NEW_PASSWORD_SAGAS, createNewPassword);
}

export default function* rootSaga() {
    yield all([watch()]);
}