import React from 'react'
import {TableRow, TableRowColumn} from 'material-ui';
import Paper from 'material-ui/Paper';
import BuyGiftModal from './BuyGiftModal';
const style = {
  maxHeight: 120,
  maxWidth: '100%'
};

var Item = (props) => (

  <TableRow hoverable={true} key={props.index}>
    <TableRowColumn style={{fontSize: 18, width: '25%'}}>{props.item.title}</TableRowColumn>
    <TableRowColumn  style={{fontSize: 18}}>${props.item.price}</TableRowColumn>
    <TableRowColumn>
        <BuyGiftModal
        item={props.item}
        index={props.index}
        refresh={props.refresh}
        isOwner={props.isOwner}
        userData={props.userData} />
    </TableRowColumn>
    <TableRowColumn hoverable={true} style={{ height: 140}}>
      {
        props.item.image_url && <Paper style={{marginTop: 10, maxHeight: 120, textAlign:'center'}} zDepth={1} >
          <img alt={''} style={style} src={props.item.image_url}/>
        </Paper>
      }
    </TableRowColumn>
  </TableRow>
)

export default Item;
