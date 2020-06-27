import React from 'react';
import moment from 'moment';
import { Divider, Label } from 'semantic-ui-react';

const MessageDivider = ({ value }) => {
  return (
    <Divider horizontal>
      <Label>{moment(value).format('dddd, MMMM Do')}</Label>
    </Divider>
  );
};
export default MessageDivider;
