import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import axios from 'axios';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
  margin: 0,
  top: 'auto',
  right: 30,
  bottom: 30,
  left: 'auto',
  position: 'fixed',
};

export default class AddList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      title: '',
      description: '',
      errorTextTitle: '*Required'
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({
      errorTextTitle: '*Required',
      open: false
    });
  };

  handleTitleChange = (e,value) => {
    if(value) {
      this.setState({
        errorTextTitle: ''
      })
    }
    this.setState({title: value})
  }

  handleDesChange = (e,value) => {
    this.setState({description:value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // this.props.func(this.state.title, this.state.description);
    this.setState({
      open: false,
      errorTextTitle: '*Required'
    });
    axios.post('/api/lists', {
      title: this.state.title,
      description: this.state.description
    })
      .then((response) => {
        this.setState({
          title: '',
          description: ''
        });
        this.props.refresh();
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  //Shows error text and removes it when a value is input
  handleErrorText = (e) => {
    //makae sure the user has entered text
    if(e.target.value.length) {
      this.setState({errorText: ''});
    } else {
      this.setState({errorText: '*Required'});
    }
  }

  render() {
    /**
     * A modal dialog can only be closed by selecting one of the actions.
     */
    const actions = [
      <FlatButton
        type="button"
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        type="Submit"
        label="Submit"
        primary={true}
        disabled={!this.state.title}
        onClick={this.handleSubmit}
      />,
    ];

    return (
      <div>
        <FloatingActionButton style={style} onClick={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title={Header()}
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <form>
            <TextField
              onChange={this.handleTitleChange}
              floatingLabelText="List Name"
              type="title"
              errorText={this.state.errorTextTitle}
              style={{marginRight: 30}}
            /><br />
            <TextField
              onChange={this.handleDesChange}
              floatingLabelText="List Description"
              type="title"
              style={{marginRight: 30}}
            /><br />

        </form>
      </Dialog>
    </div>
    );
  }
}

const Header = () => (
  <div style={{textAlign: 'center'}}> Add List </div>
)
