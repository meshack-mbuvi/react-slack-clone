import React from 'react';
import { Comment } from 'semantic-ui-react';
import moment from 'moment';

const Message = ({ message, user }) => {
  const isOwnMessage = (message, user) =>
    message.user.id === user.uid ? 'message__self' : '';

  const timerFromNow = (timestamp) => moment(timestamp).fromNow();

  return (
    <Comment>
      <Comment.Avatar src={message.user.avatar} />
      <Comment.Content className={isOwnMessage(message, user)}>
        <Comment.Author as='a'>{message.user.name}</Comment.Author>
        <Comment.Metadata>{timerFromNow(message.timestamp)}</Comment.Metadata>
        <Comment.Text>{message.content}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default Message;
