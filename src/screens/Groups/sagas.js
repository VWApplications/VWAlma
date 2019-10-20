import { all } from 'redux-saga/effects';
import listGroups from './sagas/listGroups';
import createGroup from './sagas/createGroup';
import updateGroup from './sagas/updateGroup';
import deleteGroup from './sagas/deleteGroup';

export default function* rootSaga() {
    yield all([
        listGroups(),
        createGroup(),
        updateGroup(),
        deleteGroup()
    ]);
}