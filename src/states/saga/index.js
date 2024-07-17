import {fork, all} from 'redux-saga/effects'
import appSaga from '../modules/app/saga';

export default function* sagas() {
    yield all([
        fork(appSaga),
    ]);
}