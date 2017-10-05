import React, { Component } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import {FlatButton} from 'material-ui';
import giftImage from './img/gift.png';
import AddItem from './AddItem';
import Items from './Items';
import Share from './Share';
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



class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      items: [],
      isOwner: false,
      title: '',
      shareOpen: false,
      list_id: null
    }
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    var items = [];
    var title = '';
    var isOwner = false;
    var list_id = this.props.match.params.list_id;
    this.props.currentUser.myLists.forEach((el) => {
      if (el._id === list_id) {
        title = el.title;
        items = el.items;
        isOwner = true;
      }
    })

    this.props.currentUser.sharedLists.forEach((el) => {
      if (el._id === list_id) {
        title = el.title;
        items = el.items;
      }
    })
    
    this.setState({
      userData: this.props.currentUser,
      title: title,
      isOwner: isOwner,
      items: items || [],
      list_id: list_id
    });
  }

  openShare = () => {
    this.setState({shareOpen:true});
  }

  closeShare = () => {
    this.setState({shareOpen:false});
  }

  render() {
    return (
      <div className="wishlistContainer" style={{maxWidth: 800, margin: 'auto', textAlign: 'center', paddingTop: 50}} >
        <div>
          <AppBar title={this.state.title.toUpperCase()} iconElementRight={<FlatButton label="Share" onClick={this.openShare}/>}></AppBar>
        </div>
        <div className="paperContainer">
          <Paper zDepth={2}>
            { (this.state.items.length) < 1 ? <div> <img style={{height: 150, width: 150, padding: 20, paddingBottom: 0, filter: 'grayscale(100%)'}} src={giftImage} alt='none'/>
              <h4 style={{padding: 0, color: 'grey'}}>No Items Here</h4>
            </div> : <Items 
                      items={this.state.items}
                      refresh={this.props.refresh}
                      userData={this.state.userData}
                      isOwner={this.state.isOwner}
                      history={this.props.history}
                    />
            }
          </Paper>
        </div>
        <AddItem {...this.props} currentUser={this.state.userData} refresh={this.props.refresh}/>
        <Share
          list={this.state.list_id}
          open={this.state.shareOpen}
          onRequestClose={this.closeShare.bind(this)}
          handleClose={this.closeShare.bind(this)}
        />
      </div>
    );
  }
}

export default muiThemeable()(WishList);
