import { createSelector } from 'reselect';

/**
 * Direct selector to the message domain
 */

const selectMessages = state => {
  return state.board;
};

/**
 * Select the language locale
 */

const makeSelectMessages = () =>
  createSelector(
    selectMessages,
    boardState => {
      return {...boardState};
    },
  );

export { selectMessages, makeSelectMessages };
