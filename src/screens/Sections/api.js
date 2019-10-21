import axios from 'config/axios';

export function getSectionsAPI(data, queryString=null) {
    let endpoint = "/sections/";
    if (queryString) endpoint = `/sections/?${queryString}`;
    return axios.post(endpoint, data);
}

export function createSectionAPI(data) {
    let endpoint = "/sections/";
    return axios.post(endpoint, data);
}

export function updateSectionAPI(data, sectionID) {
    let endpoint = `/sections/${sectionID}/`;
    return axios.patch(endpoint, data);
}

export function deleteSectionAPI(sectionID) {
    let endpoint = `/sections/${sectionID}/`;
    return axios.delete(endpoint);
}

export function provideSectionAPI(sectionID) {
    let endpoint = `/sections/${sectionID}/provide/`;
    return axios.get(endpoint);
}
