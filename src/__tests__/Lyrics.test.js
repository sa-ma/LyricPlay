import React from 'react';
import {
  render,
  cleanup,
  waitForElement,
  fireEvent
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';
import Lyrics from '../components/Lyrics';

const lyricData = {
  message: {
    body: {
      lyrics: {
        lyrics_body: 'Do you love the rain, does it make you dance',
        lyrics_copyright:
          'Lyrics powered by www.musixmatch.com. This Lyrics is NOT for Commercial use and only 30% of the lyrics are returned.'
      }
    }
  }
};

afterEach(cleanup);
const props = {
  tracks: [
    {
      track: {
        track_id: 181987382,
        artist_name: 'sama',
        tracks: 'Hold my Liquor'
      }
    }
  ]
};

it('loads and displays lyric', async () => {
  axiosMock.get.mockResolvedValue({ data: lyricData });

  const url = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=json&callback=callback&track_id=181987382&apikey=${process.env.REACT_APP_API_KEY}`;
  const { getByTestId, getByTitle } = render(<Lyrics {...props} />);

  const loading = getByTestId('loading');
  const title = getByTitle('Next Lyric');

  expect(loading).toBeInTheDocument();
  expect(title).toBeInTheDocument();

  const resolvedValue = await waitForElement(() => getByTestId('lyrics'));

  expect(resolvedValue).toBeInTheDocument();

  expect(axiosMock.get).toHaveBeenCalledWith(url);
});

it('displays the next lyric', async () => {
  axiosMock.get.mockResolvedValue({ data: lyricData });
  const { getByTestId } = render(<Lyrics {...props} />);
  const resolvedValue = await waitForElement(() => getByTestId('lyrics'));

  expect(resolvedValue).toBeInTheDocument();

  fireEvent.click(getByTestId('next'));

  expect(resolvedValue).toBeInTheDocument();
});
