import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import sagas from './sagas';
// REDUCERS
import homeReducer from 'screens/Home/reducers';

export const history = createBrowserHistory()

const reducers = combineReducers({
    router: connectRouter(history),
    form: formReducer,
    home: homeReducer
});

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({ collapsed: true });
    middlewares.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middlewares));

sagaMiddleware.run(sagas);

export default store;