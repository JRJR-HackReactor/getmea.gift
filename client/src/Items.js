import React from 'react'
import {Table, TableBody} from 'material-ui';
import Item from './Item';
var Items = (props) => (
  <div>
    <Table>
      <TableBody>
        { props.items.map((item, index) => {
          return <Item item={item} key={index} refresh={props.refresh} userData={props.userData} isOwner={props.isOwner} index={index}/>
        })
        }
      </TableBody>
    </Table>
  </div>
)
export default Items;
