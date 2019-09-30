import { all, put, call, takeLatest, take, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { LOGIN_SAGAS, FETCH_USER_SAGAS, REGISTER_SAGAS, UPDATE_USER_SAGAS } from './types';
import { fetchUserAction, loginAction, fetchUserSagas } from './actions';
import { loginAPI, getUserAPI, createUserAPI, updateUserAPI, updateUserPhotoAPI, removeUserPhotoAPI } from './api';
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

/* ############### FETCH USER ################## */
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

/* ############### CREATE USER ################## */
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

/* ############### UPDATE USER ################## */
function* updateUser(action) {
    const { payload } = action;

    const infoPayload = {
        "email": payload.email,
        "name": payload.name,
        "identifier": payload.identifier
    }

    try {
        const user = yield select(state => state.account.user);

        yield call(updateUserAPI, infoPayload, user.id);

        if (payload.photo) {
            if (typeof payload.photo !== "string")
                yield call(updateUserPhotoAPI, payload.photo.name, payload.photo);
            else if (payload.clean)
                yield call(removeUserPhotoAPI);
        }

        successAlert("Usuário atualizado", "Usuário atualizado com sucesso.");

        yield put(fetchUserSagas());
        yield take(["USER_FETCH"]);

        yield put(push('/profile'));
    } catch(error) {
        validateError(error);
    }
}

function* watchUpdateUser() {
    yield takeLatest(UPDATE_USER_SAGAS, updateUser);
}

export default function* rootSaga() {
    yield all([
      watchLogin(),
      watchUser(),
      watchCreateUser(),
      watchUpdateUser()
    ]);
}