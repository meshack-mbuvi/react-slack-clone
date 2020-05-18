import React from 'react';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import firebase from '../../firebase';

const UserPanel = (props) => {
  const { currentUser } = props;

  const handleSignOut = async () => {
    await firebase.auth().signOut();
  };

  const dropdownOptions = () => [
    {
      key: 'user',
      text: (
        <span>
          Signed in as <strong>{currentUser.displayName}</strong>
        </span>
      ),
      disabled: true,
    },
    { key: 'avatar', text: <span>Change Avatar</span> },
    { key: 'signOut', text: <span onClick={handleSignOut}>Sign out</span> },
  ];

  return (
    <Grid style={{ background: '#4c3c4c' }}>
      <Grid.Column>
        <Grid.Row style={{ padding: '1.2rem', margin: 0 }}>
          {/* App header */}
          <Header inverted floated='left' as='h4'>
            <Icon name='code' />
            <Header.Content>DevChat</Header.Content>
          </Header>
          {/* User dropdown */}
          <Header styles={{ padding: '0.25em' }} as='h6' inverted>
            <Dropdown
              trigger={
                <span>
                  <Image src={currentUser.photoURL} spaced='right' avatar />
                  {currentUser.displayName}
                </span>
              }
              options={dropdownOptions()}
            />
          </Header>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

export default UserPanel;
