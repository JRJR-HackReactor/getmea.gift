import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import ProfileMenuSection from './ProfileMenuSection';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {withRouter} from 'react-router';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';

const AppDrawer = ({open, toggleDrawer, currentUser, muiTheme, showLists, history, setCurrentList, handleLogout}) => {
  const renderLists = () => {
    var username = currentUser.username;
    return (
      currentUser.myLists.map((list, index) => {
        return (
          <MenuItem
            key={index}
            rightIcon={list.secret ? <VisibilityOff /> : <Visibility />}
            primaryText={list.title}
            onClick={ () => {
              history.push('/'+username+'/'+list._id);
              setCurrentList(list);
              toggleDrawer();
            } }
          ></MenuItem>
        )
      })
    )
  }

  return (
    <div>
      <Drawer open={open} onClick={toggleDrawer}>
        <MenuItem leftIcon={<ArrowBack />} onClick={toggleDrawer} />
        <ProfileMenuSection currentUser={currentUser} />
        <MenuItem leftIcon={<PersonOutline />} onClick={handleLogout}>Logout</MenuItem>
        <Divider />
        {/* If user is logged in, show a submenu of all their Wishlists */
        currentUser.username ?
          <MenuItem
            primaryText="My Lists"
            rightIcon={<ArrowDropRight />}
            menuItems={renderLists()}
          ></MenuItem> : null
        }
      </Drawer>
    </div>
  );
}

export default withRouter(muiThemeable()(AppDrawer));
