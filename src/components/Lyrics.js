import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import SkipNext from '@material-ui/icons/SkipNext';
import IconButton from '@material-ui/core/IconButton';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Form from './Form';

import { randomNumber, generateLyric, getTrackData } from '../utils/helper';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 400,
    margin: '0 auto',
    padding: '1rem',
    boxShadow: ' 0px 2px 4px #01579B',
    [theme.breakpoints.down('sm')]: {
      justifyItems: 'center',
      width: '80%',
      margin: '1rem auto'
    }
  },
  color: {
    color: '#01579B'
  },
  content: {
    textAlign: 'center',
    lineHeight: 1.5,
    padding: '10px 0'
  },
  copyright: {
    textAlign: 'center',
    padding: '10px 0',
    fontStyle: 'italic',
    color: '#f00'
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const Lyrics = (props) => {
  const trackIds = getTrackData(props.tracks, 'track_id');
  const artists = getTrackData(props.tracks, 'artist_name');
  const tracks = getTrackData(props.tracks, 'track_name');

  const [lyrics, setLyrics] = useState();
  const [copyright, setCopyRight] = useState();
  const [count, setCount] = useState(0);

  const trackName = tracks[count];
  const trackId = trackIds[count];

  const classes = useStyles();
  const rand = randomNumber(trackIds.length);

  useEffect(() => {
    const getLyrics = async (id) => {
      const lyricData = await generateLyric(id);
      setLyrics(lyricData.lyric);
      setCopyRight(lyricData.lyrics_copyright);
    };
    if (trackId) getLyrics(trackId);
  }, [trackId, trackIds]);

  const handleClick = (event) => {
    event.preventDefault();
    setCount(rand);
  };
  return (
    <Box>
      <Card className={classes.card}>
        {artists.length > 0 ? (
          <Typography variant="h5" component="h2" className={classes.color}>
            {artists[count]}
          </Typography>
        ) : (
          <Skeleton width={300} height={20} />
        )}
        {lyrics ? (
          <Typography
            data-testid="lyrics"
            variant="body2"
            component="p"
            className={classes.content}
          >
            {lyrics}
          </Typography>
        ) : (
          <Skeleton data-testid="loading" width={400} height={200} />
        )}

        {copyright ? (
          <Typography
            variant="subtitle2"
            component="p"
            className={classes.copyright}
          >
            {copyright}
          </Typography>
        ) : (
          <Skeleton width={400} height={50} />
        )}
        <Tooltip title="Next Lyric" aria-label="next lyric" placement="left">
          <IconButton
            data-testid="next"
            className={classes.button}
            onClick={handleClick}
          >
            <SkipNext className={classes.color} />
          </IconButton>
        </Tooltip>
      </Card>
      <Form track={trackName} nextLyric={handleClick} />
    </Box>
  );
};

Lyrics.propTypes = {
  tracks: PropTypes.array.isRequired
};

export default Lyrics;
