import React, { useState } from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import firebase from '../../firebase';

export const Messages = (props) => {
  const { currentChannel, currentUser } = props;
  const [messagesRef] = useState(firebase.database().ref('messages'));

  return (
    <>
      <MessagesHeader />
      <Segment>
        <Comment.Group className='messages'>Messages</Comment.Group>
      </Segment>
      <MessageForm
        messagesRef={messagesRef}
        currentChannel={currentChannel}
        currentUser={currentUser}
      />
    </>
  );
};

export default Messages;
