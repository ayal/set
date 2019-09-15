import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';



import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { selectCard } from '../Board/actions';
import { makeSelectBoard } from './selectors';

import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import saga from './saga';

import Card from 'containers/Card';

import Rect from 'components/Rect';
import Diamond from 'components/Diamond';
import Squiggle from 'components/Squiggle';


const BoardStyle = styled.div`
  width:100%;
  height:100%;
  flex-wrap: wrap;
  justify-content: space-between;

  font-size: 1.5em;
  color: palevioletred;
  border: 1px solid black;
  display:flex;
  padding:20px;
`;

function Board(props) {
  console.log('rendering board', props);
  
  let thecards = props.twelveCards.map((x,idx)=>{
    const cidx = idx + 1;
    
    let newprops = {
      index:idx + 1,
      onToggle:props.onToggle
    };
    
    let selectedCards = props.selectedCards;
    if (selectedCards && !!selectedCards[cidx]) {
      newprops.isSelected = true;
    }

    return (
      <Card color={x[1]} number={x[2]} fill={x[3]} key={`card-${idx}`} shape={x[0]} {...newprops}>
      </Card>
    );
  });

  console.log('before rendering...', props);

  return (
    <BoardStyle>
      {thecards}
    </BoardStyle>
  );
}

Board.propTypes = {
  selectedCards: PropTypes.object,
  twelveCards: PropTypes.array

};


const mapStateToProps = createSelector(
  makeSelectBoard(),
  cards => ({
    ...cards
  }),
);

export function mapDispatchToProps(dispatch) {
  return {
    onToggle: (e,props) => {
      dispatch(selectCard(props));
    },
    dispatch,
  };
}

const withSaga = injectSaga({ key: 'board', saga});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  withSaga,
)(Board);

