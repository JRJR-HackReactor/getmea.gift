import React, {Component} from 'react'
import {TableRow, TableRowColumn, FlatButton} from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleOpen = () => {
    this.setState({open:true});
  }

  handleClose = () => {
    this.setState({open:false});
  }

  deleteList = () => {
    var id = this.props.list._id
    axios.delete("/api/lists/" + id)
      .then(() => {
        this.handleClose();
        this.props.refresh();
        // ???
      })
  }

  render() {
   const deleteActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Delete List"
        primary={true}
        onClick={this.deleteList}
     />
   ];
    return (
      <TableRow hoverable={true} key={this.props.index}>
        <TableRowColumn style={{fontSize: 18, width: '25%'}}>{this.props.list.title}</TableRowColumn>
        <TableRowColumn style={{fontSize: 18, width: '50%'}}>{this.props.list.description}</TableRowColumn>
        <TableRowColumn style={{fountSize:18, width: '25%'}}> <RaisedButton style={{margin: 10}} label="Delete" onClick={this.handleOpen}/> </TableRowColumn>
        <Dialog
          actions={deleteActions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          > Are you sure you want to delete this list?
        </Dialog>
      </TableRow>
    )
  }
}

export default List;
