import React, { Component } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import { Tabs, Tab } from 'material-ui/Tabs';
import Subheader from 'material-ui/Subheader';

import axios from 'axios';

import giftImage from './img/gift.png';

import AddList from './AddList';
import Lists from './Lists';
const style = {

  backgroundStyle: {
    backgroundColor: '#eaf2ff',
    height: '110%',
    paddingBottom: 40
  },
  images: {
    maxHeight: 120,
    maxWidth: '100%'
  },
};



class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      myLists: [],
      sharedLists: [],
      showMyLists: true
    }
  }

  componentDidMount() {
    this.getUserData();
  }

  showMyLists() {
    this.setState({ showMyLists: true });
  }

  showSharedLists() {
    this.setState({ showMyLists: false });
  }

  getUserData() {
    this.setState({
      userData: this.props.currentUser,
      myLists: this.props.currentUser.myLists,
      sharedLists: this.props.currentUser.sharedLists
    });
  }

  renderMessages() {
    if (this.state.currentList) {
      var username = this.props.match.params.username;

      if (this.state.currentList.items && this.state.currentList.items.length >= 0) {
        return (

          this.state.userData.myLists.map((list, index) => {
            return (
              <MenuItem
                key={index}
                rightIcon={list.secret ? <VisibilityOff /> : <Visibility />}
                primaryText={list.title}
                onClick={ () => {
                  this.props.history.push('/'+username+'/'+list._id);
                  this.setState({currentList: list});
                }} />
            )})
          )
      }
    }
  }

  goToList(list_id) {
    this.props.history.push('/'+this.props.match.params.username+'/'+list_id);
  }

  handleDelete() {
    axios.delete('/api/lists/'+this.state.currentList._id)
    .then((res) => {
      this.setState({
        deleteOpen: false
      })
      this.props.history.push('/'+this.props.match.params.username)
    })
  }

  render() {
    const showTitle = () => {
      if (this.state.currentList) {
        return (
          <div>
          {this.state.currentList.title.toUpperCase()} <br/>
          <div style={style.username}>{this.props.match.params.username.toUpperCase()}</div>
          </div>
        )
      }
    }
    const topRightMenu = (
      this.state.currentList && <IconMenu iconButtonElement={
        <IconButton>
        <NavigationExpandMoreIcon />
        </IconButton>
      }>
        <Subheader>{this.state.currentListOwner}'s Other Wishlists </Subheader>

        {this.renderMessages()}

      </IconMenu>
    );

    var lists = this.state.showMyLists ? this.state.myLists : this.state.sharedLists;
    return (
      <div className="wishlistContainer" style={{maxWidth: 800, margin: 'auto', textAlign: 'center', paddingTop: 50}} >
        <div>
          <AppBar ></AppBar>
          <Tabs>
            <Tab onActive={this.showMyLists.bind(this)} label="Your Wishlists" />
            <Tab onActive={this.showSharedLists.bind(this)} label="Shared Wishlists" />
          </Tabs>
        </div>
        <div className="paperContainer">
          <Paper zDepth={2}>
            { lists.length < 1 ? <div> <img style={{height: 150, width: 150, padding: 20, paddingBottom: 0, filter: 'grayscale(100%)'}} src={giftImage} alt='none'/>
              <h4 style={{padding: 0, color: 'grey'}}>No Items Here</h4>
            </div> : <Lists lists={lists} refresh={this.props.refresh} />
            }
          </Paper>
        </div>
        <AddList func={this.testAdd} refresh={this.props.refresh}/>
      </div>
    );
  }
}

export default muiThemeable()(Profile);
