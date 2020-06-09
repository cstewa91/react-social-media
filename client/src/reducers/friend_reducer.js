import types from '../actions/types'

const DEFAULT_STATE = {
    isFriend: false
}

export default(state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.CHECK_IF_FRIEND:
            return {...state, isFriend: true}
        default:
            return state;
    }
}