import React from 'react'
import {Table, TableBody} from 'material-ui';
import List from './List';

class Lists extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Table>
        <TableBody displayRowCheckbox={false}>
        {  this.props.lists.map((list, index) => {
            return <List list={list} index={index} refresh={this.props.refresh} />
          })
        }
        </TableBody>
      </Table>
    )
  }
}

export default Lists;
