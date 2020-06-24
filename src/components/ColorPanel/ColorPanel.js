import React from 'react';
import { Sidebar, Menu, Divider, Button } from 'semantic-ui-react';

export const ColorPanel = () => {
  return (
    <Sidebar
      as={Menu}
      icon='labeled'
      vertical
      visible
      width='very thin'
      style={{ background: '#3F0E40' }}
    >
      <Button icon='add' size='small' color='blue' />
    </Sidebar>
  );
};

export default ColorPanel;
