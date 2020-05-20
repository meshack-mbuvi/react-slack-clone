import React, { useState } from 'react';
import { Modal, Input, Button, Icon } from 'semantic-ui-react';
import mime from 'mime-types';

const FileModal = ({ modal, closeModal, uploadFile }) => {
  const [file, setFile] = useState(null);
  const [authorized] = useState(['image/jpeg', 'image/png']);

  const addFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const isAuthorized = (fileName) => authorized.includes(mime.lookup(fileName));

  const clearFile = () => {
    setFile(null);
  };

  const sendFile = () => {
    if (file !== null) {
      if (isAuthorized(file.name)) {
        const metadata = { contentType: mime.lookup(file.name) };
        uploadFile(file, metadata);
        closeModal();
        clearFile();
      }
    }
  };
  return (
    <Modal basic open={modal} onClose={closeModal}>
      <Modal.Header> Select an Image File</Modal.Header>
      <Modal.Content>
        <Input
          fluid
          label='File types:jpg, png'
          name='file'
          type='file'
          onChange={addFile}
        />
      </Modal.Content>

      <Modal.Actions>
        <Button color='green' inverted onClick={sendFile}>
          <Icon name='checkmark' /> Send
        </Button>
        <Button color='red' inverted onClick={closeModal}>
          <Icon name='remove' /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default FileModal;
