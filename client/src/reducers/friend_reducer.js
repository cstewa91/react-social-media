import types from '../actions/types'

const DEFAULT_STATE = {
    isFriend: false,
    friends: []
}

export default(state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.CHECK_IF_FRIEND:
            return {...state, isFriend: true}
        case types.GET_ALL_FRINDS:
            return {...state, friends: action.payload.data}
        default:
            return state;
    }
}