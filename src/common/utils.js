import { errorAlert } from './alerts';

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

export function getQueryString(queryString, data, str) {
    if (queryString.includes(str)) {
        const index = queryString.lastIndexOf(`${str}=`) + `${str}=`.length;
        queryString = queryString.slice(0, index) + data;
    } else {
        queryString = queryString + `&${str}=` + data;
    }

    return queryString
}

export function validateError(error) {
    const msg = error.response.data.detail;
    if (msg) {
        errorAlert("Ops...", msg);
    } else {
        console.warn(error.response.data);
        errorAlert("Ops...", "Por favor, preencha os campos corretamente.");
    }
}