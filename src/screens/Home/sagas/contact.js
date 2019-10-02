import { all, call, takeLatest } from 'redux-saga/effects';
import { CONTACT_SAGAS } from '../types';
import { contactAPI } from '../api';
import { validateError } from 'common/utils';
import { successAlert } from 'common/alerts';

function* contact(action) {
    const { payload } = action;

    try {
        yield call(contactAPI, payload);

        successAlert("Email enviado", "O email foi enviado ao administrador da ferramenta.");
    } catch(error) {
        validateError(error);
    }
}

function* watchContact() {
    yield takeLatest(CONTACT_SAGAS, contact);
}

export default function* rootSaga() {
    yield all([watchContact()]);
}