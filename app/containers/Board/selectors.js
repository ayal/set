import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the board domain
 */

const selectBoard = state => state.board || initialState;

/**
 * Select the language locale
 */

const makeSelectBoard = () =>
  createSelector(
    selectBoard,
    boardState => {
      return boardState;
    },
  );

export { selectBoard, makeSelectBoard };
