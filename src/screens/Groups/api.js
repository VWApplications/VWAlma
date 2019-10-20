import axios from 'config/axios';

export function getGroupsAPI(data, queryString=null) {
    let endpoint = `/groups/`;
    if (queryString) endpoint = `/groups/?${queryString}`;
    return axios.post(endpoint, data);
}