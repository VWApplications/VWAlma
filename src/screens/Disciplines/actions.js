import {
    LIST_DISCIPLINE, LIST_DISCIPLINE_SAGAS
} from './types';

export function listDisciplinesAction(disciplines, activePage, count) {
    return {type: LIST_DISCIPLINE, payload: {disciplines, activePage, count}};
}

export function listDisciplinesSagas(activePage, queryString=null) {
    return {type: LIST_DISCIPLINE_SAGAS, payload: {activePage, queryString}};
}