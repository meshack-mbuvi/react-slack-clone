import React from 'react';
import Navbar from './Navbar';
import { Grid } from 'semantic-ui-react';

const Home = () => {
  return (
    <Grid>
      <Grid.Column>
        <Navbar />
      </Grid.Column>
    </Grid>
  );
};

export default Home;
