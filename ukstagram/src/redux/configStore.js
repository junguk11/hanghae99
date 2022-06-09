import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import ukstagram from "./modules/ukstagram";

const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);
const rootReducer = combineReducers({ ukstagram });
const store = createStore(rootReducer, enhancer);

export default store;
