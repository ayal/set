import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { makeSelectMessage } from './selectors';

import { useState, useEffect, useRef } from 'react';

const MessageStyle = styled.h2`
width:100%;
display:flex;
flex:1;
height:100px;
`;

const RealMessageStyle = styled.div`
width:100%;
display:flex;
flex:1;
height:100px;
`;

function Message(props) {
  const [dims, setDims] = useState(0);
  const ref = useRef();

  useEffect(() => {
    if (ref  && ref.current) {
      let rect = ref.current.getBoundingClientRect();
      if (dims.toString() !== rect.toString()) {
	 setDims(ref.current.getBoundingClientRect());
      }
    }
  });

  const children =  React.Children.map(props.children, (child, idx) => {
    let newprops = {
      pdims:dims
    };
    return React.cloneElement(child, newprops);
  });

  
  return (
    <MessageStyle isSelected={props.isSelected} onClick={e=>props.onToggle(e, props.index)}>
      <RealMessageStyle ref={ref} isSelected={props.isSelected} >
	{props.message}
      </RealMessageStyle>
    </MessageStyle>
  );
}

Message.propTypes = {
  message:PropTypes.string
};

const mapStateToProps = createSelector(
  makeSelectMessage(),
  message => ({
    message
  }),
);

const withConnect = connect(mapStateToProps);

export default withConnect(Message);
