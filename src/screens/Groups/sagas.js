import { all } from 'redux-saga/effects';
import listGroups from './sagas/listGroups';

export default function* rootSaga() {
    yield all([
        listGroups()
    ]);
}