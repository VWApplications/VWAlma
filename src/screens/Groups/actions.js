import { LIST_GROUPS, LIST_GROUPS_SAGAS } from './types';

export function listGroupsAction(groups, activePage, count) {
    return {type: LIST_GROUPS, payload: {groups, activePage, count}};
}

export function listGroupsSagas(discipline, activePage, queryString=null) {
    return {type: LIST_GROUPS_SAGAS, payload: {discipline, activePage, queryString}};
}