import axios from 'config/axios';

export function listNewsAPI(queryString=null) {
    let endpoint = "/news/";
    if (queryString)
        endpoint = `/news/?${queryString}`;

    return axios.get(endpoint);
}

export function getNewsAPI(newsID) {
    const endpoint = `/news/${newsID}/`;
    return axios.get(endpoint);
}

export function contactAPI(data) {
    const endpoint = "/contact/";
    return axios.post(endpoint, data);
}