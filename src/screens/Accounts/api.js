import axios from 'config/axios';

export function loginAPI(data) {
    let endpoint = "/api-token/";
    return axios.post(endpoint, data);
}

export function getUserAPI() {
    const endpoint = "/users/current_user/";
    return axios.get(endpoint);
}

export function createUserAPI(data) {
    const endpoint = "/users/";
    return axios.post(endpoint, data);
}