import React from 'react';
import Messages from './Messages';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Paper, TextField} from 'material-ui';
import axios from 'axios';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      inputMes: ''
    }
  }
  componentDidMount() {
    this.getMessages();
  }

  getMessages = () => {
    axios.post('/api/messages', {
      params: {
        list_id: this.props.list_id
      }
    })
      .then((messages) => {
        if(messages === null) {
          this.setState({messages:[]});
        } else {
          messages.data.forEach( (el)  => {
            //el.timestamp = moment(el.timestamp).format(ddd, Do, YYYY);  // maybe work
          })
          this.setState({messages:messages.data});
        }
      })
      .catch((err) => {
        console.log(err,"didn't get messages in chat");
      })
  }

  handleChange = (e) => {
    this.setState({
      inputMes: e.target.value
    });
  }

  messageSubmit = () => {
    var arr = this.state.messages.slice();
    arr.push(this.state.inputMes);
    this.setState({messages: arr});
    axios.post('/api/message', {
      params: {
        text: this.state.inputMes,
        name: this.props.name, 
        list_id: this.props.list_id
      } 
    })
      .then((messages) => {
        this.setState({
          messages:messages.data,
          inputMes: ''
        })
      })
      .catch((err)=> {
        console.log("err in message submit", err);
      })
  }

  render() {    
   return (
      <Paper z={4}>
        <TextField
          hintText="message"
          multiLine={true}
          rows={1}
          rowsMax={4}
          value={this.state.inputMes}
          onChange={this.handleChange}
        />
        <FloatingActionButton mini={true} onClick={this.messageSubmit.bind(this)}>
          <ContentAdd />
        </FloatingActionButton><br />
        <Messages messages={this.state.messages}/>
      </Paper>
    )
  }
}

export default Chat;
