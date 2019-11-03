import axios from 'config/axios';

export function getGroupsAPI(data, queryString=null) {
    let endpoint = "/alma/groups/";
    if (queryString) endpoint = `/alma/groups/?${queryString}`;
    return axios.post(endpoint, data);
}

export function createGroupAPI(data) {
    let endpoint = "/alma/groups/";
    return axios.post(endpoint, data);
}

export function updateGroupAPI(data, groupID) {
    let endpoint = `/alma/groups/${groupID}/`;
    return axios.patch(endpoint, data);
}

export function deleteGroupAPI(groupID) {
    let endpoint = `/alma/groups/${groupID}/`;
    return axios.delete(endpoint);
}

export function provideGroupAPI(groupID) {
    let endpoint = `/alma/groups/${groupID}/provide/`;
    return axios.get(endpoint);
}

export function addStudentGroupAPI(groupID, data) {
    let endpoint = `/alma/groups/${groupID}/add_student/`;
    return axios.post(endpoint, data);
}

export function removeStudentGroupAPI(groupID, data) {
    let endpoint = `/alma/groups/${groupID}/remove_student/`;
    return axios.post(endpoint, data);
}