import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { makeSelectMessages } from './selectors';

import Card from 'containers/Card';

import _ from 'lodash';

import { useState, useEffect, useRef } from 'react';

const MessagesStyle = styled.h2`
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
flex:1;
border-bottom:1px solid #eee;

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
    <MessagesStyle isSelected={props.isSelected} onClick={e=>props.onToggle(e, props.index)}>
      <RealMessagesStyle isSelected={props.isSelected} >
	{`DECK: ${props.allcards.length}\n`}
	{messagesdom}
      </RealMessagesStyle>
    </MessagesStyle>
  );
}

Message.propTypes = {
  messages:PropTypes.array,
  allcards: PropTypes.array
};

const mapStateToProps = createSelector(
  makeSelectMessages(),
  ({messages, allcards}) => {
    return ({
      messages,
      allcards
  })},
);

const withConnect = connect(mapStateToProps);

export default withConnect(Message);
