import axios from 'config/axios';

export function getGroupsAPI(data, queryString=null) {
    let endpoint = "/groups/";
    if (queryString) endpoint = `/groups/?${queryString}`;
    return axios.post(endpoint, data);
}

export function createGroupAPI(data) {
    let endpoint = "/groups/";
    return axios.post(endpoint, data);
}

export function updateGroupAPI(data, groupID) {
    let endpoint = `/groups/${groupID}/`;
    return axios.patch(endpoint, data);
}

export function deleteGroupAPI(groupID) {
    let endpoint = `/groups/${groupID}/`;
    return axios.delete(endpoint);
}

export function provideGroupAPI(groupID) {
    let endpoint = `/groups/${groupID}/provide/`;
    return axios.get(endpoint);
}

export function addStudentGroupAPI(groupID, data) {
    let endpoint = `/groups/${groupID}/add_student/`;
    return axios.post(endpoint, data);
}

export function removeStudentGroupAPI(groupID, data) {
    let endpoint = `/groups/${groupID}/remove_student/`;
    return axios.post(endpoint, data);
}