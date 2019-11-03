import axios from 'config/axios';

export function getDisciplinesAPI(queryString=null) {
    let endpoint = "/alma/disciplines/";
    if (queryString) endpoint = `/alma/disciplines/?${queryString}`;
    return axios.get(endpoint);
}

export function getAllDisciplinesAPI(queryString=null) {
    let endpoint = "/alma/disciplines/search/";
    if (queryString) endpoint = `/alma/disciplines/search/?${queryString}`;
    return axios.get(endpoint);
}

export function fetchDisciplineAPI(disciplineID) {
    let endpoint = `/alma/disciplines/${disciplineID}/`;
    return axios.get(endpoint);
}

export function createDisciplineAPI(data) {
    let endpoint = "/alma/disciplines/";
    return axios.post(endpoint, data);
}

export function updateDisciplineAPI(data, disciplineID) {
    let endpoint = `/alma/disciplines/${disciplineID}/`;
    return axios.patch(endpoint, data);
}

export function deleteDisciplineAPI(disciplineID) {
    let endpoint = `/alma/disciplines/${disciplineID}/`;
    return axios.delete(endpoint);
}

export function enterDisciplineAPI(data, disciplineID) {
    let endpoint = `/alma/disciplines/${disciplineID}/enter/`;
    return axios.post(endpoint, data);
}

export function resetDisciplineAPI(disciplineID) {
    let endpoint = `/alma/disciplines/${disciplineID}/reset/`;
    return axios.get(endpoint);
}

export function toogleDisciplineStatusAPI(disciplineID) {
    let endpoint = `/alma/disciplines/${disciplineID}/toogle_status/`;
    return axios.get(endpoint);
}