import {
    LIST_SECTIONS, LIST_SECTIONS_SAGAS, CREATE_SECTION_SAGAS, UPDATE_SECTION_SAGAS,
    PROVIDE_SECTION_SAGAS, DELETE_SECTION_SAGAS, UPDATE_FORM, FINISH_SECTION_SAGAS
} from './types';

export function updateFormAction(section) {
    return {type: UPDATE_FORM, payload: section};
}

export function listSectionsAction(sections, activePage, count) {
    return {type: LIST_SECTIONS, payload: {sections, activePage, count}};
}

export function listSectionsSagas(activePage, queryString=null) {
    return {type: LIST_SECTIONS_SAGAS, payload: {activePage, queryString}};
}

export function createSectionsSagas(data) {
    return {type: CREATE_SECTION_SAGAS, payload: data};
}

export function updateSectionsSagas(data, sectionID) {
    return {type: UPDATE_SECTION_SAGAS, payload: {data, sectionID}};
}

export function deleteSectionsSagas(sectionID) {
    return {type: DELETE_SECTION_SAGAS, payload: sectionID};
}

export function provideSectionsSagas(sectionID) {
    return {type: PROVIDE_SECTION_SAGAS, payload: sectionID};
}

export function finishSectionSagas() {
    return {type: FINISH_SECTION_SAGAS};
}