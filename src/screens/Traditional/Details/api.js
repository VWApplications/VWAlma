import axios from 'config/axios';

export function finishSectionAPI(sectionID) {
    let endpoint = `/sections/${sectionID}/finish/`;
    return axios.get(endpoint);
}

export function fetchSectionAPI(sectionID) {
    let endpoint = `/sections/${sectionID}/`;
    return axios.get(endpoint);
}
