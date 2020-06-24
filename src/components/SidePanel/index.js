import React from 'react';
import { Menu } from 'semantic-ui-react';
import UserPanel from './UserPanel';
import Channels from './Channels';

export const SidePanel = ({ currentUser }) => {
  return (
    <Menu
      size='large'
      inverted
      fixed='left'
      vertical
      style={{ background: '#3F0E40', fontSize: '1.2rem' }}
    >
      <UserPanel currentUser={currentUser} />
      <Channels currentUser={currentUser} />
    </Menu>
  );
};

export default SidePanel;
