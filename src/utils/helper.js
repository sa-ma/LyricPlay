import axios from 'axios';

export const getApiData = async (url) => {
  let result, error;
  const corsBypass = 'https://cors-anywhere.herokuapp.com/';
  try {
    const { data } = await axios.get(corsBypass + url);
    result = data;
  } catch (err) {
    error = err;
  }
  return { result, error };
};
export const randomNumber = (arrlength) =>
  Math.floor(Math.random() * arrlength);

export const generateLyric = async (trackId) => {
  const sanitizeLyrics = (lyric) => {
    const noNewLines = lyric.replace('/\n/g', ' ');
    const truncateLyric = noNewLines
      .split(' ')
      .splice(5, 55)
      .join(' ');
    return truncateLyric;
  };
  const url = `https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=json&callback=callback&track_id=${trackId}&apikey=${process.env.REACT_APP_API_KEY}`;
  try {
    const { result } = await getApiData(url);
    const { lyrics_body, lyrics_copyright } = result.message.body.lyrics;
    const lyric = sanitizeLyrics(lyrics_body);
    return { lyric, lyrics_copyright };
  } catch (error) {
    console.error(error);
  }
};

export const getTrackData = (trackArr, item) => {
  return trackArr.map(({ track }) => track[item]);
};
