import React from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';

export const Messages = () => {
  return (
    <>
      <MessagesHeader />
      <Segment>
        <Comment.Group className='messages'>Messages</Comment.Group>
      </Segment>
      <MessageForm />
    </>
  );
};

export default Messages;
