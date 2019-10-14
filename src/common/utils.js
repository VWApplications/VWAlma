import { errorAlert } from './alerts';
import axios from 'config/axios';
import introJs from 'intro.js/intro.js';
import { ADMIN } from 'common/constants';

export function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export function isAuthenticated() {
    const token = JSON.parse(localStorage.getItem("alma-token"));
    if (token)
        return true

    return false
}

export function replaceAll(target, search, replacement) {
    return target.replace(new RegExp(search, 'g'), replacement);
}

export function makeURL(target) {
    return replaceAll(target, " ", "-").toLowerCase();
}

export function moveToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

export function validateError(error) {
    const msg = error.response.data.detail;
    if (msg) {
        errorAlert("Ops...", msg);
    } else {
        try {
            const msg = error.response.data.non_field_errors[0];
            errorAlert("Ops...", msg);
        } catch(e) {
            console.warn(error.response.data);
            if (error.response.data.email)
                errorAlert("Ops...", error.response.data.email);
            else
                errorAlert("Ops...", "Por favor, preencha os campos corretamente.");
        }
        
    }
}

export function startHelp() {
    introJs().setOption(
        {'nextLabel': '>'},
        {'prevLabel': '<'},
        {'skipLabel': 'X'},
        {'doneLabel': 'OK'}
    ).start()
}

export function configFile(name, file, attr) {
    let formatedName = name.replace(" ", "_");
    const formData = new FormData();
    formData.append(attr, file);
    const headers = axios.defaults.headers.put['Content-Type'] = 'multipart/form-data';
    return { formatedName, headers, formData };
}

export function hasPermission(requiredPermissions, userPermissions) {
    if (!requiredPermissions) return true;
    if (userPermissions.indexOf(ADMIN) !== -1) return true;

    const allowedPermissions = new Set(requiredPermissions.filter(item => userPermissions.includes(item)));
    return allowedPermissions.size > 0;
}