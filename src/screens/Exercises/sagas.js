import { all } from 'redux-saga/effects';
import createQuestion from './sagas/createQuestion';
import listQuestions from './sagas/listQuestions';

export default function* rootSaga() {
    yield all([
        createQuestion(),
        listQuestions()
    ]);
}