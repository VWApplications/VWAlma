import axios from 'config/axios';

export function getDisciplinesAPI(queryString=null) {
    let endpoint = "/disciplines/";
    if (queryString) endpoint = `/disciplines/?${queryString}`;
    return axios.get(endpoint);
}