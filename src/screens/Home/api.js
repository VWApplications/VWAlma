import axios from 'config/axios';

export function listNewsAPI(queryString=null) {
    let endpoint = "/alma/news/";
    if (queryString)
        endpoint = `/alma/news/?${queryString}`;

    return axios.get(endpoint);
}

export function getNewsAPI(newsID) {
    const endpoint = `/alma/news/${newsID}/`;
    return axios.get(endpoint);
}

export function contactAPI(data) {
    const endpoint = "/alma/contact/";
    return axios.post(endpoint, data);
}