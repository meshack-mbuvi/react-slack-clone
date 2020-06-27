import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
import Message from './Message';
import { Segment, Comment } from 'semantic-ui-react';
import _ from 'underscore';
import moment from 'moment';
import MessageDivider from './MessageDivider';

const Messages = ({ currentChannel, currentUser }) => {
  const [messagesRef] = useState(firebase.database().ref('messages'));
  const [messages, setMessages] = useState([]);
  const [messageLoading, setMsgLoading] = useState(false);

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
    if (currentChannel.id && currentUser) {
      addListeners(currentChannel.id);
    }
  }, []);

  const groupMessages = (messages) => {
    let groupedMessages = messages.reduce((messages, item) => {
      messages[moment(item.timestamp).startOf('day').format()] = [
        ...(messages[moment(item.timestamp).startOf('day').format()] || []),
        item,
      ];
      return messages;
    }, {});
    return groupedMessages;
  };

  const displayMessages = (messages) => {
    const groupedMessages = groupMessages(messages);
    const groupedComponents = [];

    for (const group in groupedMessages) {
      groupedComponents.push(<MessageDivider value={group} />);

      groupedComponents.push(
        groupedMessages[group].map((msg) => (
          <Message key={msg.timestamp} message={msg} />
        ))
      );
    }

    return groupedComponents;
  };

  return (
    <>
      <Segment>
        <Comment.Group className='messages'>
          {displayMessages(messages)}
        </Comment.Group>
      </Segment>
    </>
  );
};

export default Messages;
