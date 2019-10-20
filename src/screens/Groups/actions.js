import {
    LIST_GROUPS, LIST_GROUPS_SAGAS, CREATE_GROUP_SAGAS, UPDATE_GROUP_SAGAS,
    PROVIDE_GROUP_SAGAS, DELETE_GROUP_SAGAS, ADD_STUDENT_GROUP_SAGAS,
    REMOVE_STUDENT_GROUP_SAGAS, UPDATE_FORM
} from './types';

export function updateFormAction(group) {
    return {type: UPDATE_FORM, payload: group};
}

export function listGroupsAction(groups, activePage, count) {
    return {type: LIST_GROUPS, payload: {groups, activePage, count}};
}

export function listGroupsSagas(activePage, queryString=null) {
    return {type: LIST_GROUPS_SAGAS, payload: {activePage, queryString}};
}

export function createGroupsSagas(data) {
    return {type: CREATE_GROUP_SAGAS, payload: data};
}

export function updateGroupsSagas(data, groupID) {
    return {type: UPDATE_GROUP_SAGAS, payload: {data, groupID}};
}

export function deleteGroupsSagas(groupID) {
    return {type: DELETE_GROUP_SAGAS, payload: groupID};
}

export function addStudentGroupsSagas(data) {
    return {type: ADD_STUDENT_GROUP_SAGAS, payload: data};
}

export function removeStudentGroupsSagas(data) {
    return {type: REMOVE_STUDENT_GROUP_SAGAS, payload: data};
}

export function provideGroupsSagas(groupID) {
    return {type: PROVIDE_GROUP_SAGAS, payload: groupID};
}