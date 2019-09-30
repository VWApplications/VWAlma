import axios from 'config/axios';
import { configFile } from 'common/utils';

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

export function updateUserAPI(data, userID) {
    const endpoint = `/users/${userID}/`;
    return axios.patch(endpoint, data);
}

export function updateUserPhotoAPI(name, file) {
    const { formatedName, formData, headers } = configFile(name, file, "photo");
    const endpoint = `/users/change_photo/${formatedName}/`;
    return axios.put(endpoint, formData, headers);
}

export function removeUserPhotoAPI() {
    const endpoint = `/users/change_photo/photo.png/`;
    return axios.delete(endpoint);
}