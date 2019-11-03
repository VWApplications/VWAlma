import axios from 'config/axios';
import { configFile } from 'common/utils';

export function loginAPI(data) {
    let endpoint = "/api-token/";
    return axios.post(endpoint, data);
}

export function getUserAPI() {
    const endpoint = "/alma/users/current_user/";
    return axios.get(endpoint);
}

export function createUserAPI(data) {
    const endpoint = "/alma/users/";
    return axios.post(endpoint, data);
}

export function updateUserAPI(data, userID) {
    const endpoint = `/alma/users/${userID}/`;
    return axios.patch(endpoint, data);
}

export function updatePasswordAPI(data) {
    const endpoint = "/users/change_password/";
    return axios.put(endpoint, data);
}

export function deleteUserAPI(userID) {
    const endpoint = `/alma/users/${userID}/`;
    return axios.delete(endpoint);
}

export function updateUserPhotoAPI(name, file) {
    const { formatedName, formData, headers } = configFile(name, file, "photo");
    const endpoint = `/alma/users/change_photo/${formatedName}/`;
    return axios.put(endpoint, formData, headers);
}

export function removeUserPhotoAPI() {
    const endpoint = `/alma/users/change_photo/photo.png/`;
    return axios.delete(endpoint);
}

export function resetPasswordAPI(email) {
    const endpoint = "/users/reset_password/";
    return axios.post(endpoint, email);
}

export function createNewPasswordAPI(data) {
    const endpoint = "/users/create_new_password/";
    return axios.put(endpoint, data);
}