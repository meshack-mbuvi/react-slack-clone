import React, { useState } from 'react';
import md5 from 'md5';
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
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const usersRef = firebase.database().ref('users');

  const isPasswordValid = () => {
    if (password.length < 6 || passwordConfirm.length < 6) {
      return false;
    }
    if (password !== passwordConfirm) {
      return false;
    }
    return true;
  };

  const isFormEmpty = () => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirm.length
    );
  };

  const isFormValid = () => {
    let error;
    if (isFormEmpty()) {
      error = { message: 'Fill in all fields.' };
      setErrors([error]);
      return false;
    } else if (!isPasswordValid()) {
      error = { message: 'Password is invalid.' };
      setErrors([error]);
      return false;
    } else {
      return true;
    }
  };

  const saveUser = async (createdUser) => {
    await usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      try {
        setLoading(true);
        setErrors([]);

        const createdUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        await createdUser.user.updateProfile({
          displayName: username,
          photoURL: `http://gravatar.com/avatar/${md5(
            createdUser.user.email
          )}?d=identicon`,
        });

        await saveUser(createdUser);
        console.log('user saved.');
        setLoading(false);
      } catch (error) {
        setErrors([error]);
        setLoading(false);
      }
    }
  };

  const displayErrors = (errors) =>
    errors.map((error, index) => <p key={index}>{error.message}</p>);

  const handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? 'error'
      : '';
  };
  return (
    <Grid textAlign='center' verticalAlign='middle' className='app'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h1' icon color='orange' textAlign='center'>
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
              className={handleInputError(errors, 'email')}
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
              className={handleInputError(errors, 'password')}
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
              className={handleInputError(errors, 'password')}
            />
            <Button
              disabled={loading}
              className={loading ? 'loading' : ''}
              color='orange'
              fluid
              size='large'
            >
              Submit
            </Button>
          </Segment>
        </Form>

        {errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {displayErrors(errors)}
          </Message>
        )}

        <Message>
          Already a user? <Link to='/login'>Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
