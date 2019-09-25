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