import axios from 'config/axios';

export function finishSectionAPI(sectionID) {
    let endpoint = `/alma/sections/${sectionID}/finish/`;
    return axios.get(endpoint);
}

export function fetchSectionAPI(sectionID) {
    let endpoint = `/alma/sections/${sectionID}/`;
    return axios.get(endpoint);
}
