/*
 *
 * Board actions
 *
 */

import { SELECT_CARD, SOLVE_BOARD, CHECK_BOARD } from './constants';

export function selectCard(cardprops) {

  return {
    type: SELECT_CARD,
    cardprops,
  };
}


export function solveBoard(cardprops) {
  return {
    type: SOLVE_BOARD,
    cardprops
  };
}


export function checkBoard(cardprops) {
  return {
    type: CHECK_BOARD,
    cardprops
  };
}
