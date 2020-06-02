import types from './types';
import axios from 'axios';

const API_LOGIN = '/api/login';
const API_CREATE_NEW_ACCOUNT = '/api/users'
const API_USER_INFO = '/api/users'
axios.defaults.withCredentials = true;

export function loginToApp(item) {
    return async function(dispatch) {
        const resp = await axios.post(API_LOGIN, item);
        console.log(resp)
        if(resp.data.success) {
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

export function getUserInfo() {
    return async function(dispatch) {
        const resp = await axios.get(API_USER_INFO)
        console.log(resp)
        if(resp.data[0]) {
            dispatch({
                type: types.GET_USER_INFO,
                payload: resp
            })
        }
    }
}