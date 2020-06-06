import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loginReducer from './login_reducer';
import userInfoReducer from './user_info_reducer'
import postReducer from './post_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    login: loginReducer,
    userInfo: userInfoReducer,
    posts: postReducer
});


export default rootReducer;