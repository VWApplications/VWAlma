import {
    LIST_DISCIPLINE, LIST_DISCIPLINE_SAGAS, CREATE_DISCIPLINE_SAGAS,
    UPDATE_DISCIPLINE_SAGAS, DELETE_DISCIPLINE_SAGAS
} from './types';

export function listDisciplinesAction(disciplines, activePage, count) {
    return {type: LIST_DISCIPLINE, payload: {disciplines, activePage, count}};
}

export function listDisciplinesSagas(activePage, queryString=null) {
    return {type: LIST_DISCIPLINE_SAGAS, payload: {activePage, queryString}};
}

export function createDisciplineSagas(data) {
    return {type: CREATE_DISCIPLINE_SAGAS, payload: data};
}

export function updateDisciplineSagas(data, disciplineID) {
    return {type: UPDATE_DISCIPLINE_SAGAS, payload: { data, disciplineID }};
}

export function deleteDisciplineSagas(disciplineID) {
    return {type: DELETE_DISCIPLINE_SAGAS, payload: disciplineID};
}