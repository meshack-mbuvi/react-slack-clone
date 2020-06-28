import React, { useState } from 'react';
import firebase from '../../../firebase';
import { Segment, Button, Input, Icon } from 'semantic-ui-react';
import FileModal from '../FileModal';

const MessageForm = (props) => {
  const { messagesRef, currentChannel, currentUser } = props;

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(false);
  };

  const openModal = () => {
    setModal(true);
  };

  const createMessage = () => {
    return {
      content: message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: currentUser.uid,
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
      },
    };
  };

  const sendMessage = async () => {
    if (message) {
      try {
        setIsLoading(true);
        await messagesRef.child(currentChannel.id).push().set(createMessage());
        setIsLoading(false);
        setMessage('');
      } catch (error) {
        setIsLoading(false);
        setErrors([error]);
      }
    } else {
      setErrors([{ message: 'Add a message' }]);
    }
  };

  const handleChange = (e) => {
    setErrors([]);
    setMessage(e.target.value);
  };

  const uploadFile = (file, metadata) => {};

  return (
    <div className='input_div'>
      <Segment style={{ margin: '2px' }}>
        <Input
          fluid
          name='message'
          labelPosition='left'
          placeholder={`Message #${currentChannel.name}`}
          onChange={handleChange}
          value={message}
          disabled={isLoading}
          className={
            errors.length > 0 &&
            errors.some((error) => error.message.includes('message'))
              ? 'error'
              : ''
          }
        />
        <Button.Group icon floated='right'>
          <Button icon onClick={openModal}>
            <Icon name='attach' />
          </Button>
          <FileModal
            modal={modal}
            closeModal={closeModal}
            uploadFile={uploadFile}
          />
          <Button
            icon
            size='mini'
            floated='right'
            onClick={sendMessage}
            disabled={message.length > 0 ? false : true}
          >
            <Icon name='send' />
          </Button>
        </Button.Group>
      </Segment>
    </div>
  );
};

export default MessageForm;
