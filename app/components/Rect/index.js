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

  
  const sqw = 40;
  const sqh = 80;
  const sqx = 0;
  const sqy = 0;


  let scale = props.pdims.width / 200;
  
  for (let i = 0; i < props.number; i++) {


    let rh = sqh * scale;
    let rw = sqw * scale;

    let centery = props.pdims.height / 2 - rh / 2 - sqy*scale;
    let centerx = (props.pdims.width / 2) - (rw / 2) + (i - ((props.number - 1)/2)) * (rw + 10*scale) - sqx*scale;

    
    centerx &&  centery && rects.push(
      <rect key={`ri${i}`}
	    rx={`${20 * scale }`} ry={`${20 * scale}`}

	    transform={`translate(${centerx},${centery})`} 
	    height={`${rh}`} width={`${rw}`} stroke={props.color} fill={fill} strokeWidth={`${scale*2.3}`} />
    ); 
  }
  
  return (
    <RectStyle>
      <svg width="100%" height="100%">
	<pattern id={`horizontal-stripe-${theuuid}`} patternUnits="userSpaceOnUse" width="1" height={`${9*(scale*1.5)}`}>
	  <line key="l1" x1="0" y1="0" x2="200" y2="0" stroke={props.color} strokeWidth={`${3*scale*2}`} />
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



