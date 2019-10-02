import { all } from 'redux-saga/effects';
import login from './sagas/login';
import fetchUser from './sagas/fetchUser';
import createUser from './sagas/createUser';
import updateUser from './sagas/updateUser';
import updatePassword from './sagas/updatePassword';
import deleteUser from './sagas/deleteUser';
import resetPassword from './sagas/resetPassword';
import createNewPassword from './sagas/createNewPassword';

export default function* rootSaga() {
    yield all([
        login(),
        fetchUser(),
        createUser(),
        updateUser(),
        updatePassword(),
        deleteUser(),
        resetPassword(),
        createNewPassword()
    ]);
}