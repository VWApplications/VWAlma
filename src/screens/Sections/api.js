import axios from 'config/axios';

export function getSectionsAPI(data, queryString=null) {
    let endpoint = "/alma/sections/";
    if (queryString) endpoint = `/alma/sections/?${queryString}`;
    return axios.post(endpoint, data);
}

export function fetchSectionAPI(sectionID) {
    let endpoint = `/alma/sections/${sectionID}/`;
    return axios.get(endpoint);
}

export function finishSectionAPI(sectionID) {
    let endpoint = `/alma/sections/${sectionID}/finish/`;
    return axios.get(endpoint);
}

export function createSectionAPI(data) {
    let endpoint = "/alma/sections/";
    return axios.post(endpoint, data);
}

export function updateSectionAPI(data, sectionID) {
    let endpoint = `/alma/sections/${sectionID}/`;
    return axios.put(endpoint, data);
}

export function deleteSectionAPI(sectionID) {
    let endpoint = `/alma/sections/${sectionID}/`;
    return axios.delete(endpoint);
}

export function provideSectionAPI(sectionID) {
    let endpoint = `/alma/sections/${sectionID}/provide/`;
    return axios.get(endpoint);
}
