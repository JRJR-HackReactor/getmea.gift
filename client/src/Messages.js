import React from 'react';
import Message from './Message';
import {Table,TableBody} from 'material-ui';

var Messages = (props) => (
  <Table>
    <TableBody>
      { props.messages.map( (message,i) => {
         return <Message message={message} key={i}/>
      })
      }
    </TableBody>
  </Table>
)

export default Messages; 
