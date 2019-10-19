import {
    LIST_STUDENTS, LIST_STUDENTS_SAGAS, FETCH_STUDENT, FETCH_STUDENT_SAGAS,
    CHANGE_STUDENT_STATUS_SAGAS, REMOVE_STUDENT_SAGAS, ADD_STUDENT_SAGAS
} from './types';

export function listStudentsAction(students, activePage, count) {
    return {type: LIST_STUDENTS, payload: { students, activePage, count }};
}

export function listStudentsSagas(discipline, activePage, queryString=null) {
    return {type: LIST_STUDENTS_SAGAS, payload: { discipline, activePage, queryString }};
}

export function fetchStudentAction(studentID) {
    return {type: FETCH_STUDENT, payload: studentID};
}

export function fetchStudentSagas(studentID) {
    return {type: FETCH_STUDENT_SAGAS, payload: studentID};
}

export function changeStudentStatusSagas(discipline, data) {
    return {type: CHANGE_STUDENT_STATUS_SAGAS, payload: { discipline, data }};
}

export function removeStudentSagas(discipline, data, queryString) {
    return {type: REMOVE_STUDENT_SAGAS, payload: { discipline, data, queryString }};
}

export function addStudentSagas(discipline, data, queryString) {
    return {type: ADD_STUDENT_SAGAS, payload: { discipline, data, queryString }};
}