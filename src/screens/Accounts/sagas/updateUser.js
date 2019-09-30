import { all, put, call, takeLatest, take, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { UPDATE_USER_SAGAS } from '../types';
import { fetchUserSagas } from '../actions';
import { updateUserAPI, updateUserPhotoAPI, removeUserPhotoAPI } from '../api';
import { validateError } from 'common/utils';
import { successAlert } from 'common/alerts';

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
    yield all([watchUpdateUser()]);
}