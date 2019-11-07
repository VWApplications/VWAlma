import axios from 'config/axios';

export function getQuestionsAPI(data, queryString=null) {
    let endpoint = "/alma/questions/";
    if (queryString) endpoint = `/alma/questions/?${queryString}`;
    return axios.post(endpoint, data);
}

export function createQuestionAPI(data) {
    let endpoint = "/alma/questions/";
    return axios.post(endpoint, data);
}

export function updateQuestionAPI(data, questionID) {
    let endpoint = `/alma/questions/${questionID}/`;
    return axios.patch(endpoint, data);
}

export function deleteQuestionAPI(questionID) {
    let endpoint = `/alma/questions/${questionID}/`;
    return axios.delete(endpoint);
}
