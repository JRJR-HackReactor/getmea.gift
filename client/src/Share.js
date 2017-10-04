import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {ShareButtons, generateShareIcon} from 'react-share';

/* https://www.npmjs.com/package/react-copy-to-clipboard */
import CopyToClipboard from 'react-copy-to-clipboard';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  EmailShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const EmailIcon = generateShareIcon('email');

export default class Share extends Component {
  constructor (props) {
    super(props);

    this.state = {
      copied: false,
      open: false
    };

    this.handleOpen = () => {
      this.setState({open: true});
    };

    this.handleClose = () => {
      this.setState({
        errorTextTitle: '*Required',
        open: false
      });
    };

    this.handleCopied = () => {
      this.setState({
        copied: true
      });

      //shows the 'copied' text for only 5 seconds
      setTimeout(() => {
        this.setState({
          copied: false
        })
      }, 5000);
    } 
  }
  
  getInitialState() {
    return {value: '', copied: false};
  }
  render() {
    const actions = [
      <FlatButton
        type="button"
        label="Close"
        primary={true}
        onClick={this.props.handleClose}
      />,
    ];

    //sets the value of the text needed to be copied to the current location
    var value = window.location.href;
    var url = "https://www.hackreactor.com/"
    return (
      <Dialog
      title="Share This List"
      actions={actions}
      modal={true}
      open={this.props.open}
      onRequestClose={this.props.onRequestClose}
      >
        <TextField value={value}
        name="url"
        hintText=""
        onChange={() => this.setState({copied: false})}
        style={{width: 300, marginRight: 50}}
        />
        <CopyToClipboard text={value}
        onCopy={() => this.handleCopied() }>
        <RaisedButton primary label="Copy to clipboard" style={{marginRight: 25}}></RaisedButton>
        </CopyToClipboard>
        <FacebookShareButton url={url}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <GooglePlusShareButton url={url}>
          <GooglePlusIcon size={32} round />
        </GooglePlusShareButton>
        <TwitterShareButton url={url}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <EmailShareButton url={url}>
          <EmailIcon size={32} round />
        </EmailShareButton>
        
      </Dialog>  
    );
  }
}


