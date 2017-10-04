import React from 'react'
import {Table, TableBody} from 'material-ui';
import List from './List';
import axios from 'axios';
class Lists extends React.Component {
  constructor(props) {
    super(props)
    this.deleteList = this.deleteList.bind(this);
  }

  deleteList(list) {
    var id = list._id
    axios.delete("/api/lists/" + id)
      .then(() => {
        // ???
      })
  }

  render() {
    return (
      <Table> 
        <TableBody displayRowCheckbox={false}>
        {  this.props.lists.map((list, index) => {
            return <List list={list} index={index} func={this.deleteList}/>
          })
        }     
        </TableBody>
      </Table>
    )
  }
}

export default Lists;
