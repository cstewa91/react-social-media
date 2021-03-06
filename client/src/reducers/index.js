import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loginReducer from './login_reducer';
import userInfoReducer from './user_info_reducer'
import postReducer from './post_reducer';
import friendReducer from './friend_reducer'
import numberOfFriends from './number_of_friends'

const rootReducer = combineReducers({
    form: formReducer,
    login: loginReducer,
    userInfo: userInfoReducer,
    posts: postReducer,
    friends: friendReducer,
    totalFriends: numberOfFriends,
});


export default rootReducer;