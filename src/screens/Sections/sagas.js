import { all } from 'redux-saga/effects';
import listSections from './sagas/listSections';
import createSection from './sagas/createSection';
import updateSection from './sagas/updateSection';
import deleteSection from './sagas/deleteSection';
import provideSection from './sagas/provideSection';

export default function* rootSaga() {
    yield all([
        listSections(),
        createSection(),
        updateSection(),
        deleteSection(),
        provideSection()
    ]);
}