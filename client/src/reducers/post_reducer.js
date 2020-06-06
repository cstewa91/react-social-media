import types from '../actions/types'

const DEFAULT_STATE = {
    posts: []
}

export default(state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.GET_POSTS:
            return { ...state, posts: action.payload.data}
        default: 
            return state
    }
}
