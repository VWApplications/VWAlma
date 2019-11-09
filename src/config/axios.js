import axios from 'axios';
import { push } from 'connected-react-router';
import { errorAlert } from 'common/alerts';
import { logoutAction } from 'screens/Accounts/actions';
import store from './store';

let baseURL = 'https://api.vwapp.net';

if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:8001';
}

axios.defaults.baseURL = baseURL;


axios.interceptors.request.use(function(config) {
    const token = JSON.parse(localStorage.getItem("alma-token"));

    if (token)
        config.headers.Authorization = `JWT ${token}`;

    return config;
}, function(error) {
    console.error(error);
    return Promise.reject(error);
});


axios.interceptors.response.use(function(response) {
    return response
}, function(error) {
    if (error.response) {
        if (error.response.status === 401) {
            if (error.response.data.code === "token_not_valid") {
                errorAlert("Ops...", "Sua sessão expirou.")
                store.dispatch(logoutAction());
                store.dispatch(push('/'));
                window.location.reload();
            }
        }

        return Promise.reject(error);
    }
    console.error(error);
    return Promise.reject(error);
});


export default axios;
