import types from '../actions/types';

const DEFAULT_STATE = {
    loggedIn: false
}

export default(state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.LOGIN_TO_APP:
            return { ...state, loggedIn: true }
        default:
            return state;
    }
}