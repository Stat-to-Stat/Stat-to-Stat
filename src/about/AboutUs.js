import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import './styles.css';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className='aboutUsContainer'>
      <Link to='/'>
        <button className='homeButton'>Home</button>
      </Link>
      <div className='aboutUsHeader'>About Us</div>
      <div className='col'>
        <Card>
          <CardContent className='aboutUsCard'>
            <img className='aboutUsImage' src='cook.png' alt='Human' />
            <Typography className='name' variant='h4' component='h2'>
              Jeremy Cook
            </Typography>
            <Typography className='name' variant='h5'>
              Co-Developer & Founder
            </Typography>
            <Typography variant='body1' component='p'>
              A recent graduate of Fullstack Academies Software Engineering boot
              camp, Jeremy originally graduated from St. John's University with
              a bachelors in Sports Management. Outside of coding, Jeremy is
              passionate about sports, especially football (one of the original
              inspirations for the Stat to Stat concept!) and Esports. He is
              very passionate about fantasy sports as well (another inspiration
              for the Stat to Stat concept).
            </Typography>
          </CardContent>
          <CardActions>
            <a
              href='https://github.com/JC00K'
              target='_blank'
              className='link'
              rel='noreferrer'
            >
              <Button size='small'>GitHub</Button>
            </a>
            <a
              href='https://www.linkedin.com/in/jeremycook1/'
              target='_blank'
              className='link'
              rel='noreferrer'
            >
              <Button size='small'>Linkedin</Button>
            </a>
          </CardActions>
        </Card>
        <Card>
          <CardContent className='aboutUsCard'>
            <img className='aboutUsImage' src='shawn.jpg' alt='Human' />
            <Typography className='name' variant='h4' component='h2'>
              Shawn Gay
            </Typography>
            <Typography className='name' variant='h5'>
              Co-Developer & Founder
            </Typography>
            <Typography variant='body1' component='p'>
              When Shawn is not coding you can find him in the kitchen cooking
              some of his favorites dishes. Shawn's favorite food is steak. His
              favorite down time hobby is working out and lifting weights in the
              gym.
            </Typography>
          </CardContent>
          <CardActions>
            <a
              href='https://github.com/Shawn-Gay'
              target='_blank'
              className='link'
              rel='noreferrer'
            >
              <Button size='small'>GitHub</Button>
            </a>
            <a
              href='https://www.linkedin.com/in/shawn-gay/'
              target='_blank'
              className='link'
              rel='noreferrer'
            >
              <Button size='small'>Linkedin</Button>
            </a>
          </CardActions>
        </Card>
      </div>
      <div>testing</div>
    </div>
  );
}
