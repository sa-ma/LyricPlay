import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';
import App from '../components/App';

const mockTracks = {
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
afterEach(cleanup);

it('displays component', async () => {
  axiosMock.get.mockResolvedValue({ data: mockTracks });
  const { getByAltText, getByTestId } = render(<App />);
  const logo = getByAltText('logo');
  const footerLink = getByTestId('footer-link');
  expect(logo).toBeInTheDocument();
  expect(footerLink).toBeInTheDocument();
  const errorMessage = await waitForElement(() => getByTestId('error'));

  expect(errorMessage).toBeInTheDocument();
});
