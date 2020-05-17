import React, { useState } from 'react';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from 'semantic-ui-react';
import firebase from '../../firebase';

import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((createdUser) => {
        console.log({ createdUser });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <Grid textAlign='center' verticalAlign='middle' className='app'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' icon color='orange' textAlign='center'>
          <Icon name='puzzle piece' color='orange' />
          Register for DevChat
        </Header>
        <Form size='large' onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              name='username'
              icon='user'
              value={username}
              iconPosition='left'
              onChange={(e) => setUsername(e.target.value)}
              type='text'
              placeholder='Username'
            />

            <Form.Input
              fluid
              name='email'
              icon='mail'
              value={email}
              iconPosition='left'
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder='Email Address'
            />

            <Form.Input
              fluid
              name='password'
              icon='lock'
              value={password}
              iconPosition='left'
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Password'
            />

            <Form.Input
              fluid
              name='passwordConfirm'
              icon='repeat'
              value={passwordConfirm}
              iconPosition='left'
              onChange={(e) => setPasswordConfirm(e.target.value)}
              type='password'
              placeholder='Password Confirm'
            />
            <Button color='orange' fluid size='large'>
              Submit
            </Button>
          </Segment>
        </Form>
        <Message>
          ALready a user? <Link to='/login'>Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
