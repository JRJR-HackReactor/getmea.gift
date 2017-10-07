import React from 'react';
import Message from './Message';
var Messages = (props) => (
  <div>
    { props.messages.map( (message,i) => {
      return <Message message={message} key={i}/>
    })
    }
  </div>
)

export default Messages; 
