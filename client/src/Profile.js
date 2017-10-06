import React, { Component } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
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
      myLists: this.props.currentUser.myLists || [],
      sharedLists: this.props.currentUser.sharedLists || []
    });
  }

  goToList(list_id) {
    this.props.history.push('/'+this.props.match.params.username+'/'+list_id);
  }

  render() {
    var isOwner = this.state.showMyLists;
    var lists = isOwner ? this.state.myLists : this.state.sharedLists;
    return (
      <div className="wishlistContainer" style={{maxWidth: 800, margin: 'auto', textAlign: 'center', paddingTop: 50}} >
        <div>
          <AppBar title={this.props.match.params.username.toUpperCase()} ></AppBar>
          <Tabs>
            <Tab onActive={this.showMyLists.bind(this)} label="Your Wishlists" />
            <Tab onActive={this.showSharedLists.bind(this)} label="Shared Wishlists" />
          </Tabs>
        </div>
        <div className="paperContainer">
          <Paper zDepth={2}>
            { (lists.length) < 1 ? <div> <img style={{height: 150, width: 150, padding: 20, paddingBottom: 0, filter: 'grayscale(100%)'}} src={giftImage} alt='none'/>
              <h4 style={{padding: 0, color: 'grey'}}>No Lists Here</h4>
            </div> : <Lists lists={lists} isOwner={isOwner} refresh={this.props.refresh} username={this.state.userData.username} history={this.props.history}/>
            }
          </Paper>
        </div>
        <AddList func={this.testAdd} isOwner={isOwner} currentUser={this.state.userData} refresh={this.props.refresh}/>
      </div>
    );
  }
}

export default muiThemeable()(Profile);
