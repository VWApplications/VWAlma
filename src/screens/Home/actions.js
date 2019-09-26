import { LIST_NEWS, GET_NEWS, LIST_NEWS_SAGAS, GET_NEWS_SAGAS } from './types';

export function listNewsAction(news) {
    return {type: LIST_NEWS, payload: news};
}

export function listNewsSagas() {
    return {type: LIST_NEWS_SAGAS};
}

export function getNewsAction(newsID) {
    return {type: GET_NEWS, payload: newsID};
}

export function getNewsSagas(newsID) {
    return {type: GET_NEWS_SAGAS, payload: newsID};
}