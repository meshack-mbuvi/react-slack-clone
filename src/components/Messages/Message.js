import React from 'react';
import { Comment } from 'semantic-ui-react';
import moment from 'moment';

const Message = ({ message }) => {
  const timer = (timestamp) => moment(timestamp).format('hh:mm A');

  return (
    <Comment>
      <Comment.Avatar src={message.user.avatar} />
      <Comment.Content>
        <Comment.Author as='a'>{message.user.name}</Comment.Author>
        <Comment.Metadata>
          <div>{timer(message.timestamp)}</div>
        </Comment.Metadata>
        <Comment.Text>{message.content}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};
export default Message;
