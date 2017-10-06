import React from 'react';
import {TableRow,TableRowColumn} from 'material-ui';
var Message = (props) => (
  <TableRow>
    <TableRowColumn style={{fontSize: 18, width: '25%'}}>{props.message.name}</TableRowColumn>   
    <TableRowColumn style={{fontSize: 18, width: '60%'}}>{props.message.text}</TableRowColumn>
  </TableRow>
)

export default Message; 
