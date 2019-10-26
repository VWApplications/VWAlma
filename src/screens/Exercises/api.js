import axios from 'config/axios';

export function getQuestionsAPI(data, queryString=null) {
    let endpoint = "/questions/";
    if (queryString) endpoint = `/questions/?${queryString}`;
    return axios.post(endpoint, data);
}

export function createQuestionAPI(data) {
    let endpoint = "/questions/";
    return axios.post(endpoint, data);
}

export function updateQuestionAPI(data, questionID) {
    let endpoint = `/questions/${questionID}/`;
    return axios.patch(endpoint, data);
}

export function deleteQuestionAPI(questionID) {
    let endpoint = `/questions/${questionID}/`;
    return axios.delete(endpoint);
}
