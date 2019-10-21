import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Musixmatch from '../assets/Mark.png';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#002F6C',
    color: '#fff',
    textAlign: 'center',
    padding: '1rem',
    marginTop: '3rem'
  },
  footerLink: {
    color: '#fff',
    margin: '0 4px',
    textDecoration: 'none',
    '&:hover': {
      color: '#01579B',
      textDecoration: 'none'
    }
  },
  footerImg: {
    width: '30px',
    height: '30px',
    verticalAlign: 'middle'
  }
}));
const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      Made with love and passion by
      <a
        data-testid="footer-link"
        href="https://samailabala.com"
        className={classes.footerLink}
        target="_blank"
        rel="noreferrer noopener"
      >
        &lt;/sama&gt;
      </a>{' '}
      and powered by{' '}
      <a
        href="https://developer.musixmatch.com/"
        className={classes.footerLink}
        target="_blank"
        rel="noreferrer noopener"
      >
        <img
          src={Musixmatch}
          alt="musixmatch logo"
          className={classes.footerImg}
        />
      </a>
    </div>
  );
};

export default Footer;
