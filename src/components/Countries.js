import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

const Countries = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex'
    },
    menuList: {
      padding: '0',
      display: 'block',
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    menuItem: {
      padding: '20px',
      justifyContent: 'center',
      '&:hover': {
        backgroundColor: '#002F6C',
        color: '#fff'
      }
    },
    selected: {
      boxShadow: ' 0px 2px 4px #01579B',
      backgroundColor: '#002F6C',
      color: '#fff',
      padding: '20px',
      justifyContent: 'center',
      marginBottom: '10px',
      '&:hover': {
        backgroundColor: '#002F6C',
        color: '#fff'
      }
    },
    paper: {
      margin: '0',
      width: '100%',
      borderRadius: '0',
      boxShadow: ' 0px 2px 4px #01579B'
    },
    mobileContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    mobileList: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
        width: '300px',
        alignItems: 'center'
      }
    }
  }));

  const classes = useStyles();

  const countryList = [
    {
      name: 'Worldwide',
      shortCode: 'ws'
    },
    {
      name: 'United States',
      shortCode: 'us'
    },
    {
      name: 'Nigeria',
      shortCode: 'ng'
    },
    {
      name: 'United Kingdom',
      shortCode: 'uk'
    },
    {
      name: 'South Africa',
      shortCode: 'za'
    }
  ];
  return (
    <Box>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <MenuList
            className={classes.menuList}
            data-testid="large-device-list"
          >
            <MenuItem className={classes.selected}>Choose Country</MenuItem>
            {countryList.map(({ name, shortCode }) => (
              <MenuItem
                className={classes.menuItem}
                key={shortCode}
                id={shortCode}
                onClick={props.changeCountry}
              >
                {name}
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      </div>
      <FormControl className={classes.mobileContainer}>
        <NativeSelect
          className={classes.mobileList}
          value={props.country}
          name="age"
          onChange={props.changeCountry}
          inputProps={{
            'aria-label': 'country',
            'data-testid': 'small-device-list'
          }}
        >
          <option value="" disabled>
            Choose Country
          </option>
          {countryList.map(({ name, shortCode }, index) => (
            <option key={index} id={shortCode} value={shortCode}>
              {name}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

Countries.propTypes = {
  country: PropTypes.string.isRequired
};
export default Countries;
