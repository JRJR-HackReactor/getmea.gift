import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

import axios from 'axios';

/* https://github.com/felixrieseberg/React-Dropzone-Component */
import Dropzone from 'react-dropzone';



const initialState = {
      open: false,
      title: '',
      price: 0,
      url: '',
      imageUrl: '',
      comments: '',
      errorTextPrice: '*Required',
      errorTextTitle: '*Required',
      fileReceived: false,
      files: null,
      fileName: '',
      loading: false
    };

export default class AddItem extends Component {
  constructor (props) {
    super(props);

    this.state = {
      open: false,
      title: '',
      price: 0,
      url: '',
      imageUrl: '',
      comments: '',
      errorTextPrice: '*Required',
      errorTextTitle: '*Required',
      fileReceived: false,
      files: null,
      fileName: '',
      loading: false
    };

    this.handleOpen = () => {
      this.setState({open: true});
    };

    this.handleClose = () => {
      this.setState({
        errorTextPrice: '*Required',
        errorTextTitle: '*Required',
        open: false
      });
    };

    this.handleTitleChange = (e, newValue) => {
      if(newValue) {
        this.setState({
          errorTextTitle: ''
        })
      }

      this.setState({title: newValue})
    }

    //sets price in state
    this.handlePriceChange = (e, newValue) => {
      //makes sure user can only enter number
      if(isNaN(newValue)) {
        this.setState({
          errorTextPrice: 'Number Only'
        })
      } else {
        this.setState({
          errorTextPrice: ''
        })
        //Do not allow a number larger than 9 digits long
        if(newValue.toString().length < 10){
          this.setState({price: newValue})
        }
      }
    }

    this.handleUrlChange = (e, newValue) => {
      this.setState({url: newValue})
    }

    this.handleCommentChange = (e, newValue) => {
      this.setState({comments: newValue})
    }

    this.handleImageUrlChange = (e, newValue) => {
      this.setState({imageUrl: newValue})
    }

    //Shows error text and removes it when a value is input
    this.handleErrorText = (e) => {
      if(e.target.value.length) {
        this.setState({errorText: ''});
      } else {
        this.setState({errorText: '*Required'});
      }
    }


    this.handleSubmit = (e) => {
      e.preventDefault();
      //start loading circle and end when state resets
      this.setState({
        loading: true
      })
      this.uploadFile();
    };


    //post to DB
    this.post = () => {
      axios.post('/api/items', {
        title: this.state.title,
        price: this.state.price,
        url: this.state.url,
        image_url: this.state.imageUrl,
        comments: this.state.comments,
        list_id: this.props.match.params.list_id
      })
      .then((response) => {
        if (response.data) {
          this.setState({open: false});
          //rerender WishListPage
          this.props.refresh();
        }
        //reset the state
        this.setState(initialState)
      })
      .catch(function (error) {
      })
    }

    this.uploadFile = () => {
      const files = this.state.files;

      //if the user has added a file
      if (files) {
        /* map over all of the images, upload them, and post them to db
        (right now there is only 1 image, but can be
        changed later to accept and render multiple images) */
        files.map(file => {
          // Initial FormData
          const formData = new FormData();
          formData.append("file", file);
          formData.append("tags", `getmeagift`);
          formData.append("upload_preset", "sgazd2ix"); //preset is with account
          formData.append("api_key", "737998977447549"); //key is based on account
          formData.append("timestamp", (Date.now() / 1000) | 0);

          // Make an AJAX upload request using Axios
          // The url is provided by cloudinary
          return axios.post("https://api.cloudinary.com/v1_1/getmeagift/image/upload", formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          })
          .then(response => {
            const data = response.data;
            //url of image in cloudinary
            const fileURL = data.secure_url
            //set the state to the new url
            this.setState({
              imageUrl: fileURL
            })

          //Now that the imageUrl is ready, post the item to the database
          this.post();
          })
        });
      } else {
        //if they don't have a file ready to be uploaded just post to database
        this.post()
      }
    }

    //when the file is added (not posted), add file to state
    this.onDrop = (files) => {
      if(files) {
        this.setState({
          fileReceived: true,
          fileName: files[0].name,
          files: files
        });
    }

  }
}

  render() {
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
        disabled={!this.state.title || !this.state.price}
        onClick={this.handleSubmit}
      />,
    ];

    const style = {
      margin: 0,
      top: 'auto',
      right: 30,
      bottom: 30,
      left: 'auto',
      position: 'fixed',
    };

    return (
      <div>
        <FloatingActionButton secondary onClick={this.handleOpen} style={style}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title={Header()}
          actions={actions}
          modal={true}
          open={this.state.open}
          autoScrollBodyContent={true}
        >
          <div style={{marginLeft: 150}}>
            <form>
                <TextField
                  onChange={this.handleTitleChange}
                  floatingLabelText="Item Name"
                  type="title"
                  value={this.state.title}
                  errorText={this.state.errorTextTitle}
                  style={{marginRight: 30}}
                /><br />
                <TextField
                  onChange={this.handlePriceChange}
                  floatingLabelText="Price"
                  type="price"
                  value={this.state.price}
                  errorText={this.state.errorTextPrice}
                  style={{maxWidth: 100}}
                /><br />
                <TextField
                  onChange={this.handleUrlChange}
                  floatingLabelText="Link to Item"
                  type="url"
                  value={this.state.url}
                /><br />

                {!this.state.fileReceived ?
                  <TextField
                    onChange={this.handleImageUrlChange}
                    floatingLabelText="Image Url"
                    type="imageUrl"
                    value={this.state.imageUrl}
                    style={{marginRight: 20}}
                  /> : <div></div>}

                <Dropzone disableClick={false} multiple={false} accept={'image/*'} onDrop={this.onDrop} style={{maxHeight: 50, maxWidth: 150}}>
                  <FlatButton secondary label="Upload Photo"></FlatButton>
                </Dropzone>
                {this.state.fileReceived ? <span style={{color: 'blue', width: 150}}>{this.state.fileName}</span> : null}
                <br />
                <TextField
                  onChange={this.handleCommentChange}
                  floatingLabelText="Description"
                  hintText="Additional Comments (color, model, size, etc)"
                  type="comments"
                  rows={2}
                  multiLine={true}
                  value={this.state.comments}
                  style={{textAlign: 'left', width: '70%'}}
                /> <br />
                {this.state.loading ? <CircularProgress style={{position: 'absolute', right: 20, bottom: 75}}/> : null}
            </form>
          </div>
        </Dialog>
      </div>
    );
  }
}

const Header = () => (
  <div style={{textAlign: 'center'}}> Add Item </div>
)
