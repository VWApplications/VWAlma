import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { connectRouter } from 'connected-react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import sagas from './sagas';
// REDUCERS
import homeReducer from 'screens/Home/reducers';
import accountReducer from 'screens/Accounts/reducers';
import disciplineReducer from 'screens/Disciplines/reducers';
import studentReducer from 'screens/Students/reducers';
import groupReducer from 'screens/Groups/reducers';
import sectionReducer from 'screens/Sections/reducers';
import questionReducer from 'screens/Exercises/reducers';

export const history = createBrowserHistory()

const reducers = combineReducers({
    router: connectRouter(history),
    home: homeReducer,
    account: accountReducer,
    discipline: disciplineReducer,
    student: studentReducer,
    group: groupReducer,
    section: sectionReducer,
    exercise: questionReducer
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