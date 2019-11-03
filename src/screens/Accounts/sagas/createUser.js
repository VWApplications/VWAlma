import { all, put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {  REGISTER_SAGAS } from '../types';
import { createUserAPI } from '../api';
import { validateError } from 'common/utils';
import { successAlert } from 'common/alerts';

function* createUser(action) {
    const { payload } = action;

    const formatedPayload = {
        "user": {
            "name": payload.name,
            "email": payload.email,
            "password": payload.password,
            "confirm_password": payload.confirm_password
        },
        "permission": payload.permission
    }

    try {
        yield call(createUserAPI, formatedPayload);

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