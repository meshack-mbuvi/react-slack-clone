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

// custom components
import ActionButton from '../Buttons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const isFormValid = () => email && password;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        setLoading(true);
        setErrors([]);
        await firebase.auth().signInWithEmailAndPassword(email, password);
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
        <Header as='h1' icon textAlign='center'>
          Login to your workspace
        </Header>
        <Form size='large' onSubmit={onSubmit}>
          <Segment>
            <Form.Input
              fluid
              name='email'
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
              value={password}
              iconPosition='left'
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Password'
              className={handleInputError(errors, 'password')}
            />

            <ActionButton loading={loading} fluid size='large'>
              Submit
            </ActionButton>
          </Segment>
        </Form>

        {errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {displayErrors(errors)}
          </Message>
        )}

        <Message>
          Don't have an account? <Link to='/register'>Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
