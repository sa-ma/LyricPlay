import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Send from '@material-ui/icons/Send';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import Notification from './Notification';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: ' 0px 2px 4px #01579B',
    margin: '2rem auto',
    display: 'flex',
    width: 400,
    flexBasis: 200,
    [theme.breakpoints.down('sm')]: {
      justifyItems: 'center',
      width: '80%',
      margin: '1rem auto'
    }
  },
  inputLabel: {
    padding: '4px'
  },
  inputElement: {
    padding: '6px'
  },
  iconColor: {
    color: '#01579B'
  },
  snackBarMargin: {
    position: 'relative',
    margin: '1rem'
  }
}));

const Form = ({ track }) => {
  const classes = useStyles();
  const [input, setInput] = useState('');
  const [wrong, setWrong] = useState();
  const [right, setRight] = useState();

  const handleClose = () => {
    setWrong(false);
    setRight(false);
  };
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (track.toLowerCase() === input.toLowerCase()) {
      setRight(true);
      setWrong(false);
    } else {
      setRight(false);
      setWrong(true);
    }
  };

  return (
    <div data-testid="form">
      <Snackbar
        className={classes.snackBarMargin}
        open={wrong}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Notification
          variant="error"
          message="Wrong. Try Again"
          onClose={handleClose}
        />
      </Snackbar>
      <Snackbar
        className={classes.snackBarMargin}
        open={right}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Notification
          variant="success"
          message="You're right"
          onClose={handleClose}
        />
      </Snackbar>
      <FormControl className={classes.root}>
        <InputLabel
          className={classes.inputLabel}
          htmlFor="adornment-send-title"
        >
          Enter Song Title
        </InputLabel>
        <Input
          className={classes.inputElement}
          id="adornment-send-title"
          type="text"
          value={input}
          onChange={handleChange}
          inputProps={{
            'data-testid': 'trackInput'
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="submit answer"
                onClick={handleSubmit}
                data-testid="submit"
              >
                <Send className={classes.iconColor} />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
};

export default Form;
