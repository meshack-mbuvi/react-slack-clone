import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

// custom components
import Navbar from './Navbar';
import BillBoard from './BillBoard';

import HeroImage from '../../images/img-hero-remote@2x.jpg';

const Home = () => {
  return (
    <>
      <Grid>
        <Grid.Column>
          <Grid.Row>
            <Navbar />
          </Grid.Row>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column width='8'>
          <BillBoard />
        </Grid.Column>
        <Grid.Column width='8'>
          <Image src={HeroImage} />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Home;
