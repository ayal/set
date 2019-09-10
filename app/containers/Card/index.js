import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useState, useEffect, useRef } from 'react';

import Rect from 'components/Rect';
import Diamond from 'components/Diamond';
import Squiggle from 'components/Squiggle';


const CardStyle = styled.div`
  cursor:pointer;
  font-size: 1em;
  text-align: center;


  user-select: none;

  display:flex;
  margin:5px;

  width: 32%;
  flex: 0 1 30%;
  margin-bottom: 2%; /* (100-32*3)/2 */
  position: relative;


`;

const RealCardStyle = styled.div`
  flex:1;
  width:100%;
  height:100%;
  max-width: 200px;
  max-height: 150px;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid black;
  border-radius:5px;
  border-color: ${props => props.isSelected ? "palevioletred" : "black"};
`;

function Card(props) {
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

  const Shape = props.shape;
  
  const components = {
    Squiggle,
    Rect,
    Diamond
  };
  
  
  let newprops = {
    ...props,
    pdims:dims
  };

  const ShapeComponent = components[Shape];
  
  return (
    <CardStyle isSelected={props.isSelected} onClick={e=>props.onToggle(e, {...props})}>
      <RealCardStyle ref={ref} isSelected={props.isSelected} >
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
};

export default Card;
