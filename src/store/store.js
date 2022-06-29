import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {authReducer} from "./auth/authReducer";
import {postsReducer} from "./posts/postsReducer";

const rootReducer = combineReducers({
    login: authReducer,
    posts: postsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

