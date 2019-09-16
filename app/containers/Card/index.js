import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useState, useEffect, useRef } from 'react';

import Rect from 'components/Rect';
import Diamond from 'components/Diamond';
import Squiggle from 'components/Squiggle';

function useWindowDims() {

  const [dims, setDims] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const handleResize = () => {
      let newdims = ref.current.getBoundingClientRect();
      if (newdims.width !== dims.width) {
	setDims(newdims);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return {dims,ref};
}



const CardStyle = styled.div`
  cursor:pointer;
  font-size: 1em;
  text-align: center;


  user-select: none;

  display:flex;
  margin:5px;

  width: 32%;
  flex: 0 1 30%;
  position: relative;


`;

const CW = 5;

const wtoh = (w)=> {
  let h = w * 130 / 200;
  return h;
};

const RealCardStyle = styled.div`
  flex:1;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid black;
  border-radius:5px;
  border-color: ${props => props.isSelected ? "palevioletred" : "black"};
  height:${props => wtoh(props.dims.width)}px;
`;

function Card(props) {
  const Shape = props.shape;
  
  const components = {
    Squiggle,
    Rect,
    Diamond
  };

  const {dims,ref} = useWindowDims();
  
  let newprops = {
    ...props,
    pdims:{width: dims.width, height: wtoh(dims.width)}
  };

  let thedims = dims;
  if (props.fdims) {
    thedims = props.fdims ;
    newprops.pdims = props.fdims;
  }

  

  const ShapeComponent = components[Shape];
  
  return (
    <CardStyle isSelected={props.isSelected} onClick={e=>props.onToggle(e, {...props})}>
      <RealCardStyle ref={ref} isSelected={props.isSelected} dims={thedims} >
	<ShapeComponent {...newprops} />
      </RealCardStyle>
    </CardStyle>
  );
}

Card.propTypes = {
  onToggle: PropTypes.func,
  isSelected: PropTypes.bool,  
  content: PropTypes.string,
  index: PropTypes.number,
  fdims: PropTypes.object
};

export default Card;
