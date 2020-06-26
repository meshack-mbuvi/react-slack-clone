import React, { useState, useEffect } from 'react';
import {
  Menu,
  Icon,
  Modal,
  Form,
  Input,
  Button,
  Segment,
  List,
} from 'semantic-ui-react';
import firebase from '../../firebase';

import { connect } from 'react-redux';
import { setCurrentChannel, setChannels } from '../../actions';
import CustomDisplayComponent from '../utils/CustomDisplayComponent';

const Channels = (props) => {
  const {
    currentUser,
    setCurrentChannel,
    setChannels,
    channels,
    currentChannel,
  } = props;

  const [modal, setModal] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [channelDetails, setChannelDetails] = useState('');
  const [channelsRef] = useState(firebase.database().ref('channels'));

  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    channelsRef.on('child_added', (snap) => {
      setChannels(snap.val());
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

  const displayChannels = () => {
    if (firstLoad && channels.length) {
      setFirstLoad(false);
      changeChannel(channels[0]);
    }

    return (
      channels.length > 0 &&
      channels.map((channel) => {
        return (
          <List.Item
            key={channel.id}
            onClick={() => changeChannel(channel)}
            name={channel.name}
            style={{ opacity: 0.7 }}
            className={channel.id === currentChannel.id ? 'active' : ''}
          >
            # {channel.name}
          </List.Item>
        );
      })
    );
  };

  return (
    <>
      <CustomDisplayComponent title='Channels'>
        <List>{displayChannels()}</List>
      </CustomDisplayComponent>

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

const mapStateToProps = ({ channel }) => {
  return {
    channels: channel.channels,
    currentChannel: channel.currentChannel,
  };
};

export default connect(mapStateToProps, { setCurrentChannel, setChannels })(
  Channels
);
