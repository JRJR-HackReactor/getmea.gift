import React from 'react';
import {Divider} from 'material-ui';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';

const style = {
  margin:4
}

var Message = (props) => (
  <div>   
    <div className = "message"> 
      <div className='name'>
        <Chip style={style}>
          <Avatar icon={<FontIcon className="material-icons">perm_identity</FontIcon>} />
          {props.message.name}
        </Chip>
      </div> 
      <div className='text'><p>{props.message.text}</p></div>
    </div>
    <Divider />
  </div>
)

export default Message; 
