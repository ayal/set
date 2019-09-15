import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {uuid2} from 'utils/general';

import { useState, useEffect, useRef } from 'react';

const SquiggleStyle = styled.div`
height:100%;
`;

function Squiggle(props) {
  const [dims, setDims] = useState(0);
  const ref = useRef();

  useEffect(() => {
    if (ref  && ref.current) {
      let rect = ref.current.getBoundingClientSquiggle();
      if (dims.toString() !== rect.toString()) {
	 setDims(ref.current.getBoundingClientSquiggle());
      }
    }
  });
  
  let theuuid = uuid2();
  let rects = [];
  let fill = props.color;

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
    let centerx = (props.pdims.width / 2) - (rw / 2) + (i - ((props.number - 1)/2)) * (rw + 10) - 30;
    
 rects.push(
      
  <path
     key={`squig-${i}`}
     d="M35.87323,86.41648C31.76658,85.52225 28.73122,83.32108 28.73122,81.18869C28.73122,80.22568 30.51672,77.13028 32.65932,74.24123C39.53351,65.23017 39.8906,60.69026 34.44482,49.95953C29.53469,40.19182 28.37411,33.79466 30.69526,28.01658C33.90916,19.55582 49.26449,13.64016 62.20938,15.70376C72.65457,17.35464 75.33283,21.82577 69.88704,28.56687C63.63778,36.33976 63.01285,42.66814 67.56589,52.1607C70.69052,58.55786 71.1369,66.94983 68.63719,72.52155C65.60184,79.26265 57.65635,84.49043 47.56826,86.27888C41.76537,87.37947 40.15842,87.37947 35.87322,86.41645L35.87323,86.41646L35.87323,86.41648z"
	 fill={fill} stroke={props.color} strokeWidth="3"
	 transform={`translate(${centerx},${centery})`} ></path>
      
    ); 
  }
  
  return (
    <SquiggleStyle>
      <svg width="100%" height="100%">
	<pattern id={`horizontal-stripe-${theuuid}`} patternUnits="userSpaceOnUse" width="10" height="10">
	    <line key="l1" x1="0" x2="100" y1="10" y2="10" stroke={props.color} strokeWidth="4" />
	  </pattern>
	{rects}
      </svg>
    </SquiggleStyle>
  );
}

Squiggle.propTypes = {
  color: PropTypes.string,
  number: PropTypes.number,
  fill: PropTypes.string
};

export default Squiggle;



