// import { createStore } from 'redux';
// import rootReducer from './reducers/index'
// export default store = createStore(rootReducer);
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
//import promise from "redux-promise-middleware"
import rootReducer from './reducers/index'

const middleware = applyMiddleware(logger,thunk);

export default createStore(rootReducer, middleware);