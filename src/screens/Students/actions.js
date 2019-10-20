import {
    LIST_STUDENTS, LIST_STUDENTS_SAGAS, CHANGE_STUDENT_STATUS_SAGAS,
    REMOVE_STUDENT_SAGAS, ADD_STUDENT_SAGAS
} from './types';

export function listStudentsAction(students, activePage, count) {
    return {type: LIST_STUDENTS, payload: { students, activePage, count }};
}

export function listStudentsSagas(activePage, queryString=null) {
    return {type: LIST_STUDENTS_SAGAS, payload: { activePage, queryString }};
}

export function changeStudentStatusSagas(data, queryString) {
    return {type: CHANGE_STUDENT_STATUS_SAGAS, payload: { data, queryString }};
}

export function removeStudentSagas(data, queryString) {
    return {type: REMOVE_STUDENT_SAGAS, payload: { data, queryString }};
}

export function addStudentSagas(data, queryString) {
    return {type: ADD_STUDENT_SAGAS, payload: { data, queryString }};
}