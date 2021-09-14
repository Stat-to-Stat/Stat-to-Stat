import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import './styles.css';

export default function AboutUs() {
  return (
    <div className='aboutUsContainer'>
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
              camp, Jeremy's originally graduated from St. John's University
              with a bachelors in Sports Management. Outside of coding, Jeremy
              is passionate about sports, especially football (one of the
              original drivers of the Stat to Stat concept!) and Esports.
            </Typography>
          </CardContent>
          <CardActions>
            <a
              href='https://github.com/JC00K'
              target='_blank'
              style={{ textDecoration: 'none' }}
              rel='noreferrer'
            >
              <Button size='small'>GitHub</Button>
            </a>
            <a
              href='https://www.linkedin.com/in/jeremycook1/'
              target='_blank'
              style={{ textDecoration: 'none' }}
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
              When Shawn is not coding you can find Shawn making his famous
              steak while jamming on his guitar. Shawn is also into body
              building. Hes also not a doctor.
            </Typography>
          </CardContent>
          <CardActions>
            <a
              href='https://github.com/Shawn-Gay'
              target='_blank'
              style={{ textDecoration: 'none' }}
              rel='noreferrer'
            >
              <Button size='small'>GitHub</Button>
            </a>
            <a
              href='https://www.linkedin.com/in/shawn-gay/'
              target='_blank'
              style={{ textDecoration: 'none' }}
              rel='noreferrer'
            >
              <Button size='small'>Linkedin</Button>
            </a>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
