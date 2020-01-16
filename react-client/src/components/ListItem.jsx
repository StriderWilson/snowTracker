import React from 'react';



const ListItem = (props) => (
  <span id={props.id}>
    { props.resort.name }
  </span>
)

export default ListItem;