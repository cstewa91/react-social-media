import types from './types';
import axios from 'axios';

const API_TO_LOGIN = '/api/login';
const API_CREATE_NEW_ACCOUNT = '/api/users'
axios.defaults.withCredentials = true;

export function loginToApp(item) {
    return async function(dispatch) {
        const resp = await axios.post(API_TO_LOGIN, item);
        console.log(resp)
    }
}

export function createNewAccount(item) {
    return async function(dispatch) {
        const resp = await axios.post(API_CREATE_NEW_ACCOUNT, item);
        console.log(resp)
    }
}