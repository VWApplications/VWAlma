import { all } from 'redux-saga/effects';
import createQuestion from './sagas/createQuestion';

export default function* rootSaga() {
    yield all([
        createQuestion()
    ]);
}