import axios from 'axios';
import { push } from 'connected-react-router';
import store from './store';

let baseURL = 'https://api.vwapplication.com.br';

if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost';
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
            const state = store.getState();
            const { authenticated } = state.account;

            if (!authenticated) {
                Promise.reject('Sua sessão expirou.');
                // store.dispatch(logoutAction());
                store.dispatch(push('/'));
            }
        }

        try {
            const msg = error.response.data.non_field_errors[0];
            console.error(msg);
            return Promise.reject(msg);
        } catch(e) {
            const msg = error.response.data.detail;
            console.error(msg);
            return Promise.reject(msg);
        }
    }
    console.error(error);
    return Promise.reject(error);
});


export default axios;