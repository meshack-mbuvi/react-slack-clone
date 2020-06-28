import React, { useState } from 'react';
import { Menu, Icon, Segment, Divider } from 'semantic-ui-react';

const CustomDisplayComponent = ({ title, children }) => {
  const [isOpen, setOpen] = useState(true);

  return (
    <>
      <Divider />
      <Menu.Menu className='channels'>
        <Menu.Item>
          <span>
            <Icon
              name={isOpen ? 'caret down' : 'caret right'}
              onClick={() => setOpen(!isOpen)}
            />
            {title}
          </span>
          <Icon name='plus' />
        </Menu.Item>
      </Menu.Menu>
      {isOpen && (
        <Segment
          style={{
            overflow: 'auto',
            maxHeight: '27em',
            height: '21em',
          }}
        >
          {children}
        </Segment>
      )}
    </>
  );
};

export default CustomDisplayComponent;
