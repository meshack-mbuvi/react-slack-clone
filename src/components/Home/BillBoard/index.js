import React from 'react';
import { Header } from 'semantic-ui-react';
import ActionButton from '../../Buttons';

const BillBoard = () => {
  return (
    <div>
      <Header as='h4'>WORK FROM HOME</Header>
      <Header as='h1' className='billboard'>
        Slack brings the team together, wherever you are
      </Header>
      <p class='c-billboard__header__copy'>
        With all of your communication and tools in one place, remote teams will
        stay productive no matter where you’re working from.
      </p>
      <div className='billboard_buttons'
      >
        <ActionButton style={{ height: '4rem' }}>
          TRY SLACK FOR FREE
        </ActionButton>
        <ActionButton style={{ height: '4rem' }} className='btn-secondary'>
          LEARN MORE
        </ActionButton>
      </div>
      <p>Need to create a workspace? Get started</p>
    </div>
  );
};

export default BillBoard;
