import React from 'react';
import { Menu, Divider, Dropdown } from 'semantic-ui-react';
const DropDownComp = (props) => {
  const { text } = props;
  return (
    <Dropdown text={text}>
      <Dropdown.Menu>
        <Dropdown.Item text='New' />
        <Dropdown.Item text='Log in to another workspace' />
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Navbar = () => {
  return (
    <div>
      <Menu secondary>
        <Menu.Item content='Why Slack?' as='a' />
        <Menu.Item content='Solutions' as='a' />
        <Menu.Item content='Resources' as='a' />
        <Menu.Item content='Enterprise' as='a' />
        <Menu.Item content='Pricing' as='a' />
        <Menu.Menu position='right' className='dropdown'>
          <Menu.Item>
            <DropDownComp text='LAUNCH SLACK' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Divider />
    </div>
  );
};

export default Navbar;
