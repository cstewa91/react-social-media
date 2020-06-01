import types from './types';
import axios from 'axios';

const API_LOGIN = '/api/login';
const API_CREATE_NEW_ACCOUNT = '/api/users'
axios.defaults.withCredentials = true;

export function loginToApp(item) {
    return async function(dispatch) {
        const resp = await axios.post(API_LOGIN, item);
        if(resp.data.success) {
            localStorage.setItem('loggedIn', resp.data.success)
            dispatch({
                type: types.LOGIN_TO_APP,
                payload: resp
            })
        } 
    }
}

export function createNewAccount(item) {
    return async function(dispatch) {
        const resp = await axios.post(API_CREATE_NEW_ACCOUNT, item);
        console.log(resp)
    }
}