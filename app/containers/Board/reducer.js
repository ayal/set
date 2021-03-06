/*
 *
 * Board reducer
 *
 */

import produce from 'immer';
import _ from 'lodash';

import { SOLVE_BOARD, SELECT_CARD, CHECK_BOARD } from './constants';

import {getSets} from 'utils/general';

function cartesian() {
  var r = [], arg = arguments, max = arg.length-1;
  function helper(arr, i) {
    for (var j=0, l=arg[i].length; j<l; j++) {
      var a = arr.slice(0); // clone arr
      a.push(arg[i][j]);
      if (i==max)
        r.push(a);
      else
        helper(a, i+1);
    }
  }
  helper([], 0);
  return r;
}

function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

const cardseq = (c1, c2) => {
  if (c2.shape) {
  if (c1[0] === c2.shape &&
      c1[1] === c2.color &&
      c1[2] === c2.number &&
      c1[3] === c2.fill
     ) {
       return true;
     }
  }
  else if (c1[0] === c2[0] &&
	   c1[1] === c2[1] &&
	   c1[2] === c2[2] &&
	   c1[3] === c2[3]
	  ) {
	    return true;
	  }
  else {
    return false;
  }
};


const randomCardsOutOfDeck = (deck, howmany) => {
  let pulled = getRandom(deck, howmany);
  _.pullAllWith(deck, pulled, cardseq);
  return pulled;
};


let shapes = ['Diamond', 'Squiggle', 'Rect'];
let colors = ['purple', 'red', 'green'];
let number = [1,2,3];
let fills = ['none', 'color', 'striped'];

const alldeck = cartesian(shapes, colors, number, fills);
const boardCards = randomCardsOutOfDeck(alldeck, 12);

// not including in deck the 12 cards we just took
let newcards = alldeck.filter(card=>{
  let iseq = boardCards.filter(tc=>!cardseq(card, tc));
  if (iseq.length < 12) {
    return false;
  }
  return true;
});

export const initialState = {
  messages:['START'],
  selectedCards: {},
  allcards: newcards,
  boardCards,
  score: 0
};


let solveBoard = (action, draft) => {
  if (Object.keys(draft.selectedCards).length === 3) {
    var threecards = Object.values(draft.selectedCards).map(x=>({number: x.number, color: x.color, fill: x.fill, shape: x.shape}));

    if ((threecards[0].color === threecards[1].color &&
	 threecards[1].color === threecards[2].color) ||
	(threecards[0].color !== threecards[1].color &&
	 threecards[1].color !== threecards[2].color &&
	 threecards[2].color !== threecards[0].color)) {
      if ((threecards[0].fill === threecards[1].fill &&
	   threecards[1].fill === threecards[2].fill) ||
	  (threecards[0].fill !== threecards[1].fill &&
	   threecards[1].fill !== threecards[2].fill &&
	   threecards[2].fill !== threecards[0].fill)) {
	if ((threecards[0].shape === threecards[1].shape &&
	     threecards[1].shape === threecards[2].shape) ||
	    (threecards[0].shape !== threecards[1].shape &&
	     threecards[1].shape !== threecards[2].shape &&
	     threecards[2].shape !== threecards[0].shape)) {
	  if ((threecards[0].number === threecards[1].number &&
	       threecards[1].number === threecards[2].number) ||
	      (threecards[0].number !== threecards[1].number &&
	       threecards[1].number !== threecards[2].number &&
	       threecards[2].number !== threecards[0].number)) {

	    // shape color number fill
	    let allcards = draft.allcards;
	    let boardCards = draft.boardCards;
	    
	    let newcards = allcards.map(card=>{
	      if (!(cardseq(card, threecards[0]) || cardseq(card, threecards[1]) || cardseq(card, threecards[2]))) {
		return card;
	      }
	    }).filter(x=>!!x);
	    
	    let newboardcards = boardCards.map(card=>{
	      if (!(cardseq(card, threecards[0]) || cardseq(card, threecards[1]) || cardseq(card, threecards[2]))) {
		return card;
	      }
	      else {
		return randomCardsOutOfDeck(newcards,1)[0];
	      }
	    });
	    
	    return {messages: [{message: 'YES ITS A SET!', cards: threecards}, ...draft.messages],
		    selectedCards: {},
		    allcards: newcards,
		    boardCards: newboardcards,
		    score: draft.score + 1
		   };
	  } 	  
	} 
      } 
    }
    return {...draft, messages: [{message: 'not a set', cards: threecards}, ...draft.messages], selectedCards: {}, score: draft.score - 1};
  }

  if (Object.keys(draft.selectedCards).filter(x=>!!draft.selectedCards[x]).length < 3) {
    return {...draft, selectedCards: draft.selectedCards};
  }
  else {
    return {};
  }
};

/* eslint-disable default-case, no-param-reassign */
const boardReducer = (state = initialState, action) =>
	produce(state, draft => {
	  
	  switch (action.type) {

	  case SELECT_CARD:
	    if (Object.keys(draft.selectedCards).length === 3) {
	      return;
	    }
            draft.selectedCards = {
	      ...draft.selectedCards,
	      [action.cardprops.index]: action.cardprops
	    };
	    let c = action.cardprops;
	    draft.messages = [...draft.messages];
            break;
	    
	  case SOLVE_BOARD:
	    var x = solveBoard(action, draft);
            draft.selectedCards = x.selectedCards;
	    draft.messages = [...x.messages];
	    draft.allcards = x.allcards;
	    draft.boardCards = x.boardCards;
	    draft.score = x.score;
            break;

	  case CHECK_BOARD:
	    var x = draft;
	    let allcards = x.allcards;
	    const sets = getSets(x.boardCards);
	    
	    let newMessages;
	    if (sets.length) {
	      newMessages = ['NO SETS? WRONG'];
	      x.score = x.score - 1;
	    }
	    else {
	      newMessages = ['NO SETS? TRUE, WILL DEAL'];
	      let boardCards = x.boardCards;
	      x.boardCards = [...boardCards,
			      ...randomCardsOutOfDeck(allcards,3)];
		
	    }
	    draft.score = x.score;
            draft.selectedCards = x.selectedCards;
	    draft.messages = [...newMessages, ...x.messages];
	    draft.allcards = allcards;
	    draft.boardCards = x.boardCards;
            break;

	  }
	  
	


	});

export default boardReducer;
