import { all } from 'redux-saga/effects';
import homeSagas from 'screens/Home/sagas';
import accountSagas from 'screens/Accounts/sagas';
import disciplineSagas from 'screens/Disciplines/sagas';
import studentSagas from 'screens/Students/sagas';
import groupSagas from 'screens/Groups/sagas';
import sectionSagas from 'screens/Sections/sagas';

export default function* rootSaga() {
    yield all([
        homeSagas(),
        accountSagas(),
        disciplineSagas(),
        studentSagas(),
        groupSagas(),
        sectionSagas()
    ]);
}