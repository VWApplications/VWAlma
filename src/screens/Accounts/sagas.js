import { all, put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { LOGIN_SAGAS, FETCH_USER_SAGAS } from './types';
import { fetchUserAction, loginAction, fetchUserSagas } from './actions';
import { loginAPI, getUserAPI } from './api';
import { errorAlert, successAlert } from 'common/alerts';

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

        yield put(push('/'));
    } catch(error) {
        console.error(error);
        errorAlert("Ops...", error);
    }
}

function* watchLogin() {
    yield takeLatest(LOGIN_SAGAS, login);
}

function* fetchUser() {
    try {
        const userResponse = yield call(getUserAPI);

        yield put(fetchUserAction(userResponse.data));
    } catch(error) {
        console.error(error);
        errorAlert("Ops...", error);
    }
}

function* watchUser() {
    yield takeLatest(FETCH_USER_SAGAS, fetchUser);
} 

export default function* rootSaga() {
    yield all([
      watchLogin(),
      watchUser()
    ]);
}