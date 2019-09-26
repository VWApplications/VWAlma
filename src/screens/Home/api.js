import axios from 'config/axios';

export function listNewsAPI() {
    const endpoint = `/news/`;
    return axios.get(endpoint);
}

export function getNewsAPI(newsID) {
    const endpoint = `/news/${newsID}/`;
    return axios.get(endpoint);
}