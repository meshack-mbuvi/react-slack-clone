import React, { useState, useEffect } from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../../firebase';

import { connect } from 'react-redux';
import { setCurrentChannel } from '../../actions';

const Channels = (props) => {
  const { currentUser, setCurrentChannel } = props;
  const [modal, setModal] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [channelDetails, setChannelDetails] = useState('');
  const [channelsRef] = useState(firebase.database().ref('channels'));
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    channelsRef.on('child_added', (snap) => {
      setChannels((channels) => [...channels, snap.val()]);
    });
  }, []);

  const closeModal = () => {
    setModal(false);
  };

  const openModal = () => {
    setModal(true);
  };

  const isFormValid = () => channelName && channelDetails;

  const addChannel = async () => {
    try {
      const key = channelsRef.push().key;
      const newChannel = {
        id: key,
        name: channelName,
        details: channelDetails,
        createdBy: {
          name: currentUser.displayName,
          avatar: currentUser.photoURL,
        },
      };

      await channelsRef.child(key).update(newChannel);
      setChannelDetails('');
      setChannelName('');
      closeModal();
      console.log('channel added.');
    } catch (error) {
      console.log({ error });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      await addChannel();
    }
  };

  const changeChannel = (channel) => {
    setCurrentChannel(channel);
  };

  const displayChannels = () =>
    channels.length > 0 &&
    channels.map((channel) => (
      <Menu.Item
        key={channel.id}
        onClick={() => changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
      >
        # {channel.name}
      </Menu.Item>
    ));
  return (
    <>
      <Menu.Menu style={{ paddingBottom: '2em' }}>
        <Menu.Item>
          <span>
            <Icon name='exchange' /> CHANNELS
          </span>{' '}
          ({channels.length}) <Icon name='add' onClick={openModal} />
        </Menu.Item>
      </Menu.Menu>
      {displayChannels()}

      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header>Add a channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <Input
                fluid
                label='Name of channel'
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <Input
                fluid
                label='About the channel'
                value={channelDetails}
                onChange={(e) => setChannelDetails(e.target.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted onClick={handleSubmit}>
            <Icon name='checkmark' /> Add
          </Button>
          <Button color='red' inverted onClick={closeModal}>
            <Icon name='remove' /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default connect(null, { setCurrentChannel })(Channels);
