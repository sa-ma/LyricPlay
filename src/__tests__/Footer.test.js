import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from '../components/Footer';

describe('<Footer/>', () => {
  it('should render a Footer component', () => {
    const { getByText, getByTestId, getByAltText } = render(<Footer />);
    const footerText = getByText('Made with', { exact: false });
    const footerLink = getByTestId('footer-link');
    const musixmatch = getByAltText('musixmatch logo');
    expect(footerText).toBeInTheDocument();
    expect(musixmatch).toBeInTheDocument();
    expect(footerLink).toBeInTheDocument();
  });
});
