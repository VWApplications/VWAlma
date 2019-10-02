import {
    LOGIN, LOGIN_SAGAS, LOGOUT, USER_FETCH,
    FETCH_USER_SAGAS, REGISTER_SAGAS,
    UPDATE_USER_SAGAS, UPDATE_PASSWORD_SAGAS,
    DELETE_USER_SAGAS, RESET_PASSWORD_SAGAS,
    CREATE_NEW_PASSWORD_SAGAS
} from './types';

export function loginSagas(data) {
    return {type: LOGIN_SAGAS, payload: data};
}

export function loginAction(data) {
    return { type: LOGIN, payload: data };
}

export function logoutAction() {
    return {type: LOGOUT};
}

export function fetchUserSagas() {
    return {type: FETCH_USER_SAGAS};
}

export function fetchUserAction(data) {
    return {type: USER_FETCH, payload: data};
}

export function registerSagas(data) {
    return {type: REGISTER_SAGAS, payload: data};
}

export function updateUserSagas(data) {
    return {type: UPDATE_USER_SAGAS, payload: data};
}

export function updatePasswordSagas(data) {
    return {type: UPDATE_PASSWORD_SAGAS, payload: data};
}

export function deleteUserSagas() {
    return {type: DELETE_USER_SAGAS};
}

export function resetPasswordSagas(email) {
    return {type: RESET_PASSWORD_SAGAS, payload: email};
}

export function createNewPasswordSagas(data) {
    return {type: CREATE_NEW_PASSWORD_SAGAS, payload: data};
}