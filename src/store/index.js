import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from "redux";
import {logger} from "redux-logger";
import {rootReducer} from '../redux/reducers/rootReducer';

const middlewares = [];
middlewares.push(thunk);

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));