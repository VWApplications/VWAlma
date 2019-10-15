import axios from 'config/axios';

export function getDisciplinesAPI(queryString=null) {
    let endpoint = "/disciplines/";
    if (queryString) endpoint = `/disciplines/?${queryString}`;
    return axios.get(endpoint);
}

export function getAllDisciplinesAPI(queryString=null) {
    let endpoint = "/disciplines/search/";
    if (queryString) endpoint = `/disciplines/search/?${queryString}`;
    return axios.get(endpoint);
}

export function createDisciplineAPI(data) {
    let endpoint = "/disciplines/";
    return axios.post(endpoint, data);
}

export function updateDisciplineAPI(data, disciplineID) {
    let endpoint = `/disciplines/${disciplineID}/`;
    return axios.patch(endpoint, data);
}

export function deleteDisciplineAPI(disciplineID) {
    let endpoint = `/disciplines/${disciplineID}/`;
    return axios.delete(endpoint);
}

export function enterDisciplineAPI(data, disciplineID) {
    let endpoint = `/disciplines/${disciplineID}/enter/`;
    return axios.post(endpoint, data);
}