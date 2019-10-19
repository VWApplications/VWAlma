import axios from 'config/axios';

export function getStudentsAPI(disciplineID, queryString=null) {
    let endpoint = `/disciplines/${disciplineID}/students/`;
    if (queryString) endpoint = `/disciplines/${disciplineID}/students/?${queryString}`;
    return axios.get(endpoint);
}

export function fetchStudentAPI(studentID) {
    let endpoint = `/users/${studentID}/`;
    return axios.get(endpoint);
}

export function changeStudentStatusAPI(disciplineID, studentID) {
    let endpoint = `/disciplines/${disciplineID}/toogle_student_status/`;
    return axios.post(endpoint, studentID);
}

export function removeStudentAPI(disciplineID, studentID) {
    let endpoint = `/disciplines/${disciplineID}/remove_student/`;
    return axios.post(endpoint, studentID);
}

export function addStudentAPI(disciplineID, studentEmail) {
    let endpoint = `/disciplines/${disciplineID}/add_student/`;
    return axios.post(endpoint, studentEmail);
}