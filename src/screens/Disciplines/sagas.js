import { all } from 'redux-saga/effects';
import profileDisciplines from './sagas/profileDisciplines';
import createDiscipline from './sagas/createDiscipline';
import updateDiscipline from './sagas/updateDiscipline';
import deleteDiscipline from './sagas/deleteDiscipline';
import listAllDisciplines from './sagas/listDisciplines';
import enterDiscipline from './sagas/enterDiscipline';

export default function* rootSaga() {
    yield all([
        profileDisciplines(),
        createDiscipline(),
        updateDiscipline(),
        deleteDiscipline(),
        listAllDisciplines(),
        enterDiscipline()
    ]);
}