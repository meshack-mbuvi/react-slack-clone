import React from 'react';
import './App.css';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import ColorPanel from './ColorPanel/ColorPanel';
import Messages from './Messages';
import SidePanel from './SidePanel';
import MetaPanel from './MetaPanel';

const App = ({ currentUser, currentChannel }) => (
  <Grid className='app' style={{ background: '#fff' }} divided>
    <Grid.Column width='3'>
      <SidePanel
        key={currentUser && currentUser.uid}
        currentUser={currentUser}
      />
    </Grid.Column>

    <Grid.Column width='8'>
      <Messages
        key={currentChannel && currentChannel.id}
        currentChannel={currentChannel}
        currentUser={currentUser}
      />
    </Grid.Column>

    <Grid.Column style={{ width: 4 }}>
      <MetaPanel />
    </Grid.Column>
  </Grid>
);

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
});
export default connect(mapStateToProps)(App);
