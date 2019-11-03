import axios from 'config/axios';

export function getStudentsAPI(disciplineID, queryString=null) {
    let endpoint = `/alma/disciplines/${disciplineID}/students/`;
    if (queryString) endpoint = `/disciplines/${disciplineID}/students/?${queryString}`;
    return axios.get(endpoint);
}

export function changeStudentStatusAPI(disciplineID, data) {
    let endpoint = `/alma/disciplines/${disciplineID}/toogle_student_status/`;
    return axios.post(endpoint, data);
}

export function removeStudentAPI(disciplineID, data) {
    let endpoint = `/alma/disciplines/${disciplineID}/remove_student/`;
    return axios.post(endpoint, data);
}

export function addStudentAPI(disciplineID, data) {
    let endpoint = `/alma/disciplines/${disciplineID}/add_student/`;
    return axios.post(endpoint, data);
}