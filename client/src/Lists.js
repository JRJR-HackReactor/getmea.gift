import React from 'react'
import {Table, TableBody} from 'material-ui';
import List from './List';

var Lists = (props) => (

  <Table>
    <TableBody displayRowCheckbox={false}>
      { props.lists.map((list, index) => {
          return <List list={list} key={index} refresh={props.refresh} />
        })
      }
    </TableBody>
  </Table>
)

export default Lists;
