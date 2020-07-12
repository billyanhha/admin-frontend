import { all } from 'redux-saga/effects';
import { uiSaga } from './ui/saga';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { authSaga } from './auth/saga';

export function* rootSaga() {
  yield all([
    loadingBarMiddleware(),
    authSaga(),
    uiSaga(),
  ]);
}
