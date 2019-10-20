import { all } from 'redux-saga/effects';
import listGroups from './sagas/listGroups';
import createGroup from './sagas/createGroup';
import updateGroup from './sagas/updateGroup';
import deleteGroup from './sagas/deleteGroup';
import provideGroup from './sagas/provideGroup';
import addStudentGroup from './sagas/addStudent';
import removeStudentGroup from './sagas/removeStudent';

export default function* rootSaga() {
    yield all([
        listGroups(),
        createGroup(),
        updateGroup(),
        deleteGroup(),
        provideGroup(),
        addStudentGroup(),
        removeStudentGroup()
    ]);
}