import React from 'react';
import {
  Grid,
  Header,
  Icon,
  Dropdown,
  Image,
  Segment,
} from 'semantic-ui-react';
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
    <Grid>
      <Grid.Column>
        <Grid.Row
          style={{
            padding: '1.2rem',
          }}
        >
          {/* App header */}
          <Header inverted floated='left' as='h4'>
            <Header.Content>
              <Dropdown
                trigger={<span>DeveloperISH</span>}
                options={dropdownOptions()}
              />
            </Header.Content>
            <Header.Content>
              <Segment>
                <Icon circular />
                {currentUser.displayName}
              </Segment>
            </Header.Content>
          </Header>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

export default UserPanel;
