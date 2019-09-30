import { all, put, call, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { DELETE_USER_SAGAS } from '../types';
import { deleteUserAPI } from '../api';
import { validateError } from 'common/utils';
import { successAlert } from 'common/alerts';

function* deleteUser() {
    try {
        const user = yield select(state => state.account.user);

        yield call(deleteUserAPI, user.id);

        successAlert("Usuário deletado", "Usuário deletado com sucesso.");

        localStorage.removeItem("alma-token");
        localStorage.removeItem("user");
        yield put(push('/login'));
    } catch(error) {
        validateError(error);
    }
}

function* watchDeleteUser() {
    yield takeLatest(DELETE_USER_SAGAS, deleteUser);
}

export default function* rootSaga() {
    yield all([watchDeleteUser()]);
}