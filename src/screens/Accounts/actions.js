import {
    LOGIN, LOGIN_SAGAS, LOGOUT, USER_FETCH,
    FETCH_USER_SAGAS, REGISTER_SAGAS
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