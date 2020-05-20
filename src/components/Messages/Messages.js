import React, { useState, useEffect } from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import firebase from '../../firebase';

import Message from './Message';

export const Messages = (props) => {
  const { currentChannel, currentUser } = props;
  const [messagesRef] = useState(firebase.database().ref('messages'));
  const [messages, setMessages] = useState([]);
  const [messageLoding, setMsgLoading] = useState(false);

  const addMessageListeners = (channelId) => {
    const loadedMessages = [];
    messagesRef.child(channelId).on('child_added', (snap) => {
      loadedMessages.push(snap.val());
      setMessages([...loadedMessages]);
      setMsgLoading(false);
    });
  };

  const addListeners = (channelId) => {
    addMessageListeners(channelId);
  };

  useEffect(() => {
    if (currentChannel && currentUser) {
      addListeners(currentChannel.id);
    }
  }, []);

  const displayMessages = (messages) =>
    messages.length > 0 &&
    messages.map((msg) => (
      <Message key={msg.timestamp} message={msg} user={currentUser} />
    ));

  return (
    <>
      <MessagesHeader />
      <Segment>
        <Comment.Group className='messages'>
          {displayMessages(messages)}
        </Comment.Group>
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
