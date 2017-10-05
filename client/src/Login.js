import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

/**
* A modal dialog can only be closed by selecting one of the actions.
*/
const style = {
  RightBtns: {
      marginTop: 5,
      marginRight: 5
    },
}
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      register: false,
      username: '',
      password: '',
      verifyPassword: ''
    };

    this.handleOpen = () => {
      this.setState({open: true});
    };

    this.handleClose = () => {
      this.setState({open: false});
    };

    this.toggleRegister = () => {
      this.setState({register: !this.state.register})
    };

    this.handleUsernameChange = (e, newValue) => {
      this.setState({username: newValue})
    };

    this.handlePasswordChange = (e, newValue) => {
      this.setState({password: newValue})
    };

    this.handleVerifyPasswordChange = (e, newValue) => {
      this.setState({verifyPassword: newValue})
    };

    this.handleLoginSubmit = (e) => {
      e.preventDefault();
      axios.post('/api/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then((response) => {
        if (response.data) {
          this.setState({open: false});
          if (this.props.history.location.pathname === '/'){
            this.props.history.push('/'+this.state.username)
          }
          this.props.refresh();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    };

    this.handleRegisterSubmit = (e) => {
      e.preventDefault();
      axios.post('api/signup', {
        username: this.state.username,
        password: this.state.password
      })
      .then((response) => {
        if(response.data) {
          // this.props.refresh(response.data);
          this.setState({open: false});
          if (this.props.history.location.pathname === '/'){
            this.props.history.push('/'+this.state.username)
          }
        } else {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    };

    this.handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        if (this.state.register) {
          this.handleRegisterSubmit(e);
        } else {
          this.handleLoginSubmit(e);
        }
      }
    }
  };

  render() {

    var username = this.props.user.username;

    const loginActions = [
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
        disabled={!this.state.username || !this.state.password}
        onClick={this.handleLoginSubmit}
      />
    ];

    const registerActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={
          !this.state.username
          || !this.state.password
          || this.state.password !== this.state.verifyPassword
        }
        onClick={this.handleRegisterSubmit}
      />
    ];

    var welcomeBack = (
      <RaisedButton secondary style={{color: 'white'}} className="LogoutBtn" label={"Logout, "+username} onClick={this.props.handleLogout} />
    );

    var loginDiv = (
      <div className="login">
        <RaisedButton className="LoginBtn" secondary label="Login" onClick={this.handleOpen} />
        <Dialog
          title="Login"
          actions={loginActions}
          modal={true}
          open={this.state.open}
        >
          <div style={{textAlign: 'center'}}>
            <form>
              <TextField
                onKeyPress={this.handleKeyPress}
                onChange={this.handleUsernameChange}
                hintText="username"
                floatingLabelText="username"
                value={this.state.username}
              /><br />
              <TextField
                onKeyPress={this.handleKeyPress}
                onChange={this.handlePasswordChange}
                hintText="password"
                floatingLabelText="password"
                type="password"
                value={this.state.password}
              /><br />
            </form>
            <p>Dont have an account? <span style={{cursor: "pointer"}} onClick={this.toggleRegister}>Create one</span></p>
          </div>
        </Dialog>
      </div>
    );

    var registerDiv = (
      <div className="register">
        <Dialog
          title="Create an account"
          actions={registerActions}
          modal={true}
          open={this.state.open}
        >
          <div style={{textAlign: 'center'}}>
            <form onSubmit={this.handleSubmit}>
              <TextField
                onKeyPress={this.handleKeyPress}
                onChange={this.handleUsernameChange}
                hintText="username"
                floatingLabelText="username"
                value={this.state.username}
              /><br />
              <TextField
                onKeyPress={this.handleKeyPress}
                onChange={this.handlePasswordChange}
                hintText="password"
                floatingLabelText="password"
                type="password"
                value={this.state.password}
                /><br />
              <TextField
                onKeyPress={this.handleKeyPress}
                onChange={this.handleVerifyPasswordChange}
                hintText="verify password"
                floatingLabelText="verify password"
                type="password"
                value={this.state.verifyPassword}
                errorText={this.state.password === this.state.verifyPassword ? '' : "Passwords do not match"}
              /><br />
            </form>
            <p>Already have an account? <span style={{cursor: 'pointer'}} onClick={this.toggleRegister}>Login</span></p>
          </div>
        </Dialog>
      </div>
    )

    if (this.state.open) {
      return this.state.register ? registerDiv : loginDiv
    } else {
      return (
        <div style={style.RightBtns}>
        {
          username ? welcomeBack : loginDiv
        }
        </div>
      )
    }
  }
}
