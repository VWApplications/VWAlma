import { all, put, call, takeLatest, take } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { LOGIN_SAGAS } from '../types';
import { loginAction, fetchUserSagas } from '../actions';
import { loginAPI } from '../api';
import { validateError } from 'common/utils';
import { successAlert } from 'common/alerts';

function* login(action) {
    const { payload } = action;

    const data = {
        "email": payload.email,
        "password": payload.password
    }

    try {
        const token = JSON.parse(localStorage.getItem("alma-token"));

        if (!token)
            var tokenResponse = yield call(loginAPI, data);

        const state = {
            "token": token ? token : tokenResponse.data.access,
            "remember": payload.rememberMe ? {"email": data.email, "password": data.password} : null
        }

        yield put(loginAction(state));

        yield put(fetchUserSagas());

        successAlert("Usuário autenticado", "Usuário autenticado com sucesso.");

        yield take(["USER_FETCH"]);
        yield put(push('/profile'));
    } catch(error) {
        validateError(error);
    }
}

function* watchLogin() {
    yield takeLatest(LOGIN_SAGAS, login);
}

export default function* rootSaga() {
    yield all([watchLogin()]);
}