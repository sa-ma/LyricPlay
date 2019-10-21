import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import Countries from './Countries';
import Lyrics from './Lyrics';
import Footer from './Footer';
import { getApiData } from '../utils/helper';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '3rem 1rem'
  },
  error: {
    color: '#F00',
    textAlign: 'center'
  }
}));
const PlayLyrics = () => {
  const [country, setCountry] = useState('');
  const [tracks, setTracks] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const classes = useStyles();
  const handleClick = (event) => {
    setCountry(event.target.id || event.target.value);
  };

  useEffect(() => {
    const getTracks = async () => {
      const url = `https://api.musixmatch.com/ws/1.1/chart.tracks.get?format=json&callback=callback&page=1&page_size=30&country=${country}&f_has_lyrics=1&apikey=${process.env.REACT_APP_API_KEY}`;
      try {
        const { result } = await getApiData(url);
        const { track_list } = result.message.body;
        setTracks(track_list);
      } catch (error) {
        setErrorMessage('Network Problem. Please reload page');
      }
    };
    getTracks();
  }, [country]);
  return (
    <Box>
      <Header />

      <Grid container spacing={0} className={classes.root}>
        <Grid item xs={12} md={2}>
          <Countries changeCountry={handleClick} country={country} />
        </Grid>
        <Grid item xs={12} md={10}>
          {errorMessage ? (
            <Typography
              variant="body2"
              component="p"
              data-testid="error"
              className={classes.error}
            >
              {errorMessage}
            </Typography>
          ) : (
            ''
          )}
          <Lyrics tracks={tracks} />
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
};

export default PlayLyrics;
