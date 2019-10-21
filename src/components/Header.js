import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../assets/logo.svg';

const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    padding: '0.5rem 3rem'
  }
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <img src={Logo} alt="logo" />
    </div>
  );
};

export default Header;
