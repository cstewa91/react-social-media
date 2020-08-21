import types from '../actions/types';

const DEFAULT_STATE = 0


export default(state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.GET_NUMBER_OF_FRIENDS:
            return { ...state, numberOfFriends: action.payload.data[0].totalFriends }
        default:
            return state
    }
}