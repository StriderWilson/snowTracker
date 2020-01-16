import React from 'react';
import styled from 'styled-components';
import ListItem from './ListItem.jsx';

const Boarder = styled.div`
  border: 1px solid;
  border-radius: 5px;
  font-family: 'Archivo Black', sans-serif;
  font-size: 20px;
  cursor: pointer;
`
const Margin = styled.div`
  margin: 5px;
`

const List = (props) => (
  <div>
    <h4> Top Resorts of the Day </h4>
    <Boarder>
      { props.resorts.map((resort, index) => <Margin onClick={props.expand} key={index} ><span>{(index + 1) + '. '}</span><ListItem id={index} resort={resort} /></Margin>)}
    </Boarder>
  </div>
)

export default List;