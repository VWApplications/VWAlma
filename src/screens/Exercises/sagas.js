import { all } from 'redux-saga/effects';
import createQuestion from './sagas/createQuestion';
import listQuestions from './sagas/listQuestions';
import deleteQuestion from './sagas/deleteQuestion';
import updateQuestion from './sagas/updateQuestion';

export default function* rootSaga() {
    yield all([
        createQuestion(),
        listQuestions(),
        deleteQuestion(),
        updateQuestion()
    ]);
}