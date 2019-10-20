import { all } from 'redux-saga/effects';
import listStudent from './sagas/listStudents';
import removeStudent from './sagas/removeStudent';
import addStudent from './sagas/addStudent';
import changeStudentStatus from './sagas/changeStudentStatus';

export default function* rootSaga() {
    yield all([
        listStudent(),
        removeStudent(),
        addStudent(),
        changeStudentStatus()
    ]);
}