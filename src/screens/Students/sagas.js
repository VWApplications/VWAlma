import { all } from 'redux-saga/effects';
import listStudent from './sagas/listStudents';
import fetchStudent from './sagas/fetchStudent';
import removeStudent from './sagas/removeStudent';
import addStudent from './sagas/addStudent';

export default function* rootSaga() {
    yield all([
        listStudent(),
        fetchStudent(),
        removeStudent(),
        addStudent()
    ]);
}