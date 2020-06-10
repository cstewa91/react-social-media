import types from './types';
import axios from 'axios';

const API_LOGIN = '/api/login';
const API_USERS = '/api/users';
const API_POSTS = '/api/posts';
const API_FRIENDS = '/api/friends'
const API_ALL_FRIENDS = '/api/all-friends'
axios.defaults.withCredentials = true;

export function loginToApp(item) {
    return async function(dispatch) {
        const resp = await axios.post(API_LOGIN, item);
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
        const resp = await axios.post(API_USERS, item);
    }
}

export function getUserInfo(item) {
    return async function(dispatch) {
        const resp = await axios.get(API_USERS, {
            params: {
                account: item
            }
        })
        if(resp.data[0]) {
            dispatch({
                type: types.GET_USER_INFO,
                payload: resp
            })
        }
    }
}

export function submitPost(item) {
    return async function(dispatch) {
        const resp = await axios.post(API_POSTS, item)
    }
}

export function getPosts(item) {
    return async function(dispatch) {
        const resp = await axios.get(API_POSTS, {
            params: {
                account: item
            }
        })
        if(resp.data[0]) {
            dispatch( {
                type: types.GET_POSTS,
                payload: resp
            }) 
        }
    }
}

export function getPostData(item) {
    return async function(dispatch) {
        const resp =  await axios.get(API_USERS, {
            params: {
                account: item
            }
        });
        return resp
    }
}

export function checkIfFriend(item) {
    return async function(dispatch) {
        const resp = await axios.get(API_FRIENDS, {
            params: {
                friend: item
            }
        })
        if(resp.data[0]) {
            dispatch({
                type: types.CHECK_IF_FRIEND,
                payload: resp
            })
        }
    }
}

export function addFriend(item) {
    return async function(dispatch) {
        const resp = await axios.post(API_FRIENDS, {
            params: {
                friend: item
            }
        })
    }
}

export function getFriends(item) {
    return async function(dispatch) {
        const resp = await axios.get(API_ALL_FRIENDS, {
            params: {
                account: item
            }
        })
        if(resp.data[0]) {
            dispatch({
                type: types.GET_ALL_FRINDS,
                payload: resp
            })
        }
    }
}
