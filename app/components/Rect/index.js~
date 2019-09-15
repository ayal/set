import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {uuid2} from 'utils/general';

import { useState, useEffect, useRef } from 'react';

const RectStyle = styled.div`
height:100%;
`;

function Rect(props) {
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

  let rects = [];
  let fill = props.color;
  let theuuid = uuid2();

  if (props.fill === 'color') {
    fill = props.color;
  }

  if (props.fill === 'none' || !props.fill) {
    fill = 'transparent';
  }

  if (props.fill === 'striped') {
    fill = `url(#horizontal-stripe-${theuuid})`;
  }

  for (let i = 0; i < props.number; i++) {
    let rh = props.pdims.height * 0.6;
    let rw = props.pdims.width * 0.2;
    
    let centery = props.pdims.height / 2 - rh / 2;
    let centerx = (props.pdims.width / 2) - (rw / 2) + (i - ((props.number - 1)/2)) * (rw + 10);
    
    centerx &&  centery && rects.push(
      <rect key={`ri${i}`}
	    x={centerx}
	    y={centery}
	    rx="20" ry="20" height="60%" width="20%" stroke={props.color} fill={fill} strokeWidth="3" />
    ); 
  }
  
  return (
    <RectStyle>
      <svg width="100%" height="100%">
	<pattern id={`horizontal-stripe-${theuuid}`} patternUnits="userSpaceOnUse" width="10" height="10">
	  <line key="l1" y1="10" y2="10" x1="0" x2="100" stroke={props.color} strokeWidth="4" />
	  </pattern>
	{rects}
      </svg>
    </RectStyle>
  );
}

Rect.propTypes = {
  color: PropTypes.string,
  number: PropTypes.number,
  fill: PropTypes.string
};

export default Rect;



