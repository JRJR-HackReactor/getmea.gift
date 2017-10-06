import React from 'react'
import {TableRow, TableRowColumn, FlatButton, RaisedButton} from 'material-ui';

var List = (props) => (
  <TableRow key={props.index}>
    <TableRowColumn style={{fontSize: 18, width: '25%'}}><FlatButton label={props.list.title} onClick={() => props.select(props.list._id)}/></TableRowColumn>
    <TableRowColumn style={{fontSize: 18, width: '50%'}}>{props.list.description}</TableRowColumn>
    <TableRowColumn style={{fountSize:18, width: '25%'}}> <RaisedButton style={{margin: 10}} label={props.label} onClick={() =>props.delete(props.list._id)}/> </TableRowColumn>
  </TableRow>
)

export default List;
