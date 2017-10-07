import React from 'react'
import {Table, TableBody, FlatButton} from 'material-ui';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';
import List from './List';
class Lists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      selectedId: null
    }
  }

  handleOpen = (id) => {
    this.setState({
      open: true,
      selectedId: id
    });
  }

  handleClose = () => {
    this.setState({open:false});
  }

  deleteList = () => {
    if(this.props.isOwner) {
      axios.delete("/api/lists/" + this.state.selectedId)
        .then(() => {
          this.handleClose();
          this.props.refresh();
        })
    } else {
      /*  TODO */
      ///axios.remove()
    }
  }

  selectHandle = (id) => {
    this.props.history.push('/'+this.props.username+'/'+id)
  }

  render() {
    var label = this.props.isOwner ? "delete": "remove";
    const deleteActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label={label + " List"} 
        primary={true}
        onClick={this.deleteList}
     />
     ];  
    return (
      <div>
        <Table>
          <TableBody>
            { this.props.lists.map((list, index) => {
              return <List list={list} key={index} label={label} delete={this.handleOpen}  select={this.selectHandle}/>
            })
            }
          </TableBody>
        </Table>
        <Dialog
          actions={deleteActions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        > Are you sure you want to {label} this list?
        </Dialog>
      </div>
    )
  }
}
export default Lists;
