import React from 'react';
import Messages from './Messages';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Paper, TextField} from 'material-ui';
import socketIOClient from "socket.io-client";
/// need to change when deployed
const socket = socketIOClient('localhost:3001');
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      inputMes: '',
    }
  }

  componentWillMount() {
    this.getMessages();
    var context = this;
    socket.on(this.props.list_id, function(data) {
      if(data.messages === null) {
        context.setState({messages:[]});
      } else {
        context.setState({
          messages:data.messages,
          inputMes: ''
        });
      }
    });
  }

  getMessages = () => {
    var obj = {
      id: this.props.list_id,
      message: null
    }
    socket.emit('postMessage', obj)
  }

  handleChange = (e) => {
    this.setState({
      inputMes: e.target.value
    });
  }

  messageSubmit = () => {
    var obj = {
      id: this.props.list_id,
      message: {
        text: this.state.inputMes,
        name: this.props.name,
        list_id: this.props.list_id
      }
    }
    socket.emit('postMessage',obj);
  } 

  render() {    
   return (
      <Paper rounded={false} zDepth={5} style={{padding:5}}>
        <br/> 
        <TextField
          hintText="message"
          multiLine={true}
          rows={1}
          rowsMax={4}
          value={this.state.inputMes}
          onChange={this.handleChange}
        />
        <RaisedButton
          label="Send"
          labelPosition="before"
          onClick={this.messageSubmit.bind(this)}
          icon={<ContentAdd/>}
        />
        <br />
        <Messages messages={this.state.messages}/>
      </Paper>
    )
  }
}

export default Chat;
