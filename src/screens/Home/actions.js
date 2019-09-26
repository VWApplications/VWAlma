import { LIST_NEWS, GET_NEWS, LIST_NEWS_SAGAS, GET_NEWS_SAGAS } from './types';

export function listNewsSagas(activePage, queryString=null) {
    return {
        type: LIST_NEWS_SAGAS,
        payload: {activePage, queryString}
    };
}

export function listNewsAction(news, activePage, count) {
    return {
        type: LIST_NEWS,
        payload: {news, activePage, count}
    };
}

export function getNewsSagas(newsID) {
    return {type: GET_NEWS_SAGAS, payload: newsID};
}

export function getNewsAction(newsID) {
    return {type: GET_NEWS, payload: newsID};
}