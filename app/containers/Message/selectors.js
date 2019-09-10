import { createSelector } from 'reselect';

/**
 * Direct selector to the message domain
 */

const selectMessage = state => {
  return state.board;
};

/**
 * Select the language locale
 */

const makeSelectMessage = () =>
  createSelector(
    selectMessage,
    boardState => {
      console.log('board state, message selector', boardState);
      return boardState.message;
    },
  );

export { selectMessage, makeSelectMessage };
