import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {uuid2} from 'utils/general';

import { useState, useEffect, useRef } from 'react';

const DiamondStyle = styled.div`
height:100%;
`;

function Diamond(props) {
  const [dims, setDims] = useState(0);
  const ref = useRef();

  useEffect(() => {
    if (ref  && ref.current) {
      let diamond = ref.current.getBoundingClientDiamond();
      if (dims.toString() !== diamond.toString()) {
	 setDims(ref.current.getBoundingClientDiamond());
      }
    }
  });

  let diamonds = [];
  let fill = props.color;

  let theuuid = uuid2();

  if (props.fill === 'color') {
    fill = props.color;
  }

  if (props.fill === 'none' || !props.fill) {
    fill = 'transparent';
  }

  if (props.fill === 'striped') {
    fill = `url(#horizontal-stripe-${theuuid}`;
  }


  for (let i = 0; i < props.number; i++) {
    let rh = props.pdims.height * 0.6;
    let rw = props.pdims.width * 0.2;
    
    let centery = props.pdims.height / 2 - rh / 2 - 5;
    let centerx = (props.pdims.width / 2) - (rw / 2) + (i - ((props.number - 1)/2)) * (rw + 20) - 200;
    
    diamonds.push(
      <polygon key={`ri${i}`}
	       x={centerx}
	       y={centery}
	       points="0,25, 50,0, 100,25, 50,50"
	       stroke={props.color} fill={fill} strokeWidth="3"
	       transform={`rotate(90) translate(${centery},${centerx})`}/>
    ); 
  }
  return (
    <DiamondStyle>
      <svg width="100%" height="100%">
	<pattern id={`horizontal-stripe-${theuuid}`} patternUnits="userSpaceOnUse" width="10" height="10">
	    <line key="l1" x1="10" x2="10" y1="0" y2="100" stroke={props.color} strokeWidth="4" />
	  </pattern>
	{diamonds}
      </svg>
    </DiamondStyle>
  );
}

Diamond.propTypes = {
  color: PropTypes.string,
  number: PropTypes.number,
  fill: PropTypes.string
};

export default Diamond;



