/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest, delay } from 'redux-saga/effects';

import { SELECT_CARD } from './constants';
import {solveBoard} from 'containers/Board/actions';

import request from 'utils/request';
import { makeSelectBoard } from 'containers/Board/selectors';

/**
 * Github repos request/response handler
 */
export function* checkBoardState() {
  // Select username from store

  const data = yield select(makeSelectBoard());
  yield delay(500);
  yield put(solveBoard(data));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* checkBoard() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  console.warn('inside saga!');
  
  yield takeLatest(SELECT_CARD, checkBoardState);
}
