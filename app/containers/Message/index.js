import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { makeSelectMessages } from './selectors';

import { checkBoard } from '../Board/actions';
import {getSets} from 'utils/general';


import Card from 'containers/Card';

import _ from 'lodash';

import { useState, useEffect, useRef } from 'react';

const MessagesStyle = styled.div`
width:100%;
display:flex;
text-align:center;
flex:1;
`;

const RealMessagesStyle = styled.div`
font-size:10px;
width:100%;
display:flex;
text-align:center;
flex:1;
justify-content:center;
align-items:center;
text-transform:uppercase;
white-space: pre-wrap;
display:flex;
flex:1;
flex-direction:column;
`;

const MessageStyle = styled.div`
width:100%;
display:flex;
flex-direction:column;
align-items:center;
border-bottom:1px solid black;
min-height:55px;
flex:1;
justify-content:center;
padding:5px;
> * {
display:flex;
flex:1;
}
`;

const Dashboard = styled.div`
background:#555;
font-size:13px;
color:white;
width:100%;
flex:1;
flex-direction:row;
display:flex;
border-bottom:1px solid black;
margin-bottom:10px;
padding:20px;
align-items:baseline;
> * {
flex:1;
}

> button {
height:25px;
margin:1px;
}

`;


const CardsWrap = styled.div`
display:flex;
flex-direction:row;
width:150px;
`;


function Message(props) {
  let messagesdom = _.take(props.messages, 5).map((m,i)=>{
    if (m.cards) {
      return (
	<MessageStyle key={`d-${i}`}>
	<div>{m.message}</div>
	<CardsWrap> {
	    m.cards.map((x,idx)=>{
	      if (x.shape) {
		x = [x.shape, x.color, x.number, x.fill];
	      }
	      
	      return (
	
		  <Card color={x[1]} number={x[2]} fill={x[3]} shape={x[0]}>
		  </Card>

	      );
	    })
	}</CardsWrap></MessageStyle>);
    }
    else {
      return (
	<MessageStyle>{m}</MessageStyle>
      );
    }
  });

  return (
    <MessagesStyle isSelected={props.isSelected}>
      <RealMessagesStyle isSelected={props.isSelected} >
	<Dashboard>
	  <button onClick={()=>{
	      let sets = getSets(props.boardCards);
	      alert(JSON.stringify(sets));
	    }}>get sets</button>

	  <button onClick={(e)=>{
	      props.onCheckBoard(e, props);
	    }}>no sets?</button>
	  
	  <div>{`DECK: ${props.allcards.length}\n`}</div>
	  <div>{`SCORE: ${props.score}\n`}</div>
	</Dashboard>
	{messagesdom}	
      </RealMessagesStyle>
    </MessagesStyle>
  );
}

Message.propTypes = {
  messages:PropTypes.array,
  allcards: PropTypes.array,
  score: PropTypes.number,
  boardCards: PropTypes.array,
};

export function mapDispatchToProps(dispatch) {
  return {
    onCheckBoard: (e,props) => {
      dispatch(checkBoard(props));
    },
    dispatch,
  };
}


const mapStateToProps = createSelector(
  makeSelectMessages(),
  ({messages, allcards, boardCards, score}) => {
    return ({
      messages,
      allcards,
      score,
      boardCards
  })},
);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(Message);
