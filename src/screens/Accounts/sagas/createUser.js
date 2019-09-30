import { all, put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {  REGISTER_SAGAS } from '../types';
import { createUserAPI } from '../api';
import { validateError } from 'common/utils';
import { successAlert } from 'common/alerts';

function* createUser(action) {
    const { payload } = action;

    try {
        yield call(createUserAPI, payload);

        successAlert("Usuário criado", "Usuário criado com sucesso.");

        yield put(push('/login'));
    } catch(error) {
        validateError(error);
    }
}

function* watchCreateUser() {
    yield takeLatest(REGISTER_SAGAS, createUser);
}

export default function* rootSaga() {
    yield all([watchCreateUser()]);
}