import { all } from 'redux-saga/effects';
import homeSagas from 'screens/Home/sagas';
import accountSaga from 'screens/Accounts/sagas';
import disciplineSaga from 'screens/Disciplines/sagas';

export default function* rootSaga() {
    yield all([
        homeSagas(),
        accountSaga(),
        disciplineSaga()
    ]);
}