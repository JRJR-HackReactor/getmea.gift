import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Error from 'material-ui/svg-icons/alert/error';
import axios from 'axios';

class BuyGiftModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      modalOpen: false
    };

    this.handleClose = ()=> {
      this.setState({
        open: false
      });
    }

    this.handleOpen = ()=> {
      this.setState({
        open: true
      });
    }

    this.purchaseItem = () => {
    var id = this.props.item._id
     axios.put("/api/setPurchased/" + id, {
          purchased: true
      })
     .then(() => {
       this.handleModalClose()
       this.props.refresh();
     })
    }

   this.deleteItem = () => {
      var id = this.props.item._id
     axios.delete("/api/items/" + id)
     .then(() => {
       this.handleModalClose()
       this.props.refresh();
     })
   }

    this.handleModalOpen = () => {
      this.handleClose()
      if(props.isOwner) {
        this.deleteItem();
      } else {
        this.setState({modalOpen: true});
      }
    }


    this.handleModalClose = () => {
      this.setState({modalOpen: false });
    }

  }



  render() {
    const actions = [ < FlatButton
      label = "Yes"
      primary = { true }
      keyboardFocused = { true }
      onClick = { () => { this.handleModalOpen() } }
      />,
      < FlatButton
      label = "No"
      primary = { true }
      keyboardFocused = { true }
      onClick = { () => { this.handleClose() } }
      />,
    ];

    const modalActions = [ < FlatButton
      label = "Yes. I'm positive I will get this gift."
      primary
      onClick = { ()=>{this.purchaseItem()} }
      />,
      < FlatButton
      label = "No. I'm not totally sure I will get this gift."
      primary
      onClick = { this.handleModalClose }
      />
    ];

    var text = '';
    if (this.props.isOwner) {
      text = "Are you sure you want to delete this?";
    } else {
      text = "Will you get this gift?";
    }
    if (this.state.open) {
      return (
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >

          <p style={{color: 'black'}}>{this.props.item.title}</p>
          <p style={{color: 'black'}}>Price: ${this.props.item.price}</p>
          <p style={{color: 'black'}}>Comments from {this.props.userData.username[0].toUpperCase()+''+this.props.userData.username.slice(1)}: {this.props.item.comments}</p>
          {this.props.item.image_url && <Paper style ={{maxHeight: 290, maxWidth: 290}}><img alt ='' style={{maxHeight: 290, maxWidth: 290}} src={this.props.item.image_url}/></Paper>}
          <p style={{fontSize: 15, color: 'black'}}>Link to product: <a style={{height: 20, textDecoration: 'none',  color: 'white', backgroundColor: this.props.primary, border: '1px solid #d8e7ff', padding: 1, fontSize: 14, borderRadius: '10%'}} href={this.props.item.url} target="_blank">Click Here</a></p>
          <h3 style={{textAlign: 'right', marginTop: -50}}>{text}</h3>

        </Dialog>
      )
    }
    if (this.state.modalOpen) {
      return (
        <Dialog
          actions={modalActions}
          modal={true}
          open={this.state.modalOpen}>
          <Error style={{float: 'right'}} />
          {!this.props.isOwner ? 
              <div>
                <h2>Are you sure you are going to get this gift?</h2>
                <div>If you claim this gift, it will disappear. And nobody else will be able to get this for {this.props.userData.username[0].toUpperCase()+this.props.userData.username.slice(1)}. 
                </div> 
              </div>:
              <h2>Are you sure you want to delete this item?  </h2>}   
            </Dialog>
      )
    } else {
      if (!this.props.isOwner) {
        return <RaisedButton secondary label="Get Gift" onClick={this.handleOpen.bind(this)} />
      } else {
        return <RaisedButton secondary label="Delete" onClick={this.handleOpen.bind(this)} />
      }
    }
  }
}

export default BuyGiftModal;
