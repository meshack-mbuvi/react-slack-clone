import React, { useState } from 'react';
import { Segment, Button, Input } from 'semantic-ui-react';
import firebase from '../../firebase';
import FileModal from './FileModal'

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
      setErrors([
        {
          message: 'Add a message.',
        },
      ]);
    }
  };

  const handleChange = (e) => {
    setErrors([]);
    setMessage(e.target.value);
  };

  const uploadFile = (file, metadata) => {
    
  }

  return (
    <Segment className='message__form'>
      <Input
        fluid
        name='message'
        style={{ marginBottom: '0.7em' }}
        label={<Button icon={'add'} />}
        labelPosition='left'
        placeholder='Write your message'
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
      <Button.Group icon widths='2'>
        <Button
          color='orange'
          content='Add Reply'
          labelPosition='left'
          icon='edit'
          onClick={sendMessage}
        />
        <Button
          color='teal'
          content='Upload Media'
          labelPosition='right'
          icon='cloud upload'
          onClick={openModal}
        />
        <FileModal modal={modal} closeModal={closeModal} uploadFile={uploadFile}/>
      </Button.Group>
    </Segment>
  );
};

export default MessageForm;
