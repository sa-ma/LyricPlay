import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '../components/Header';

describe('<Header/>', () => {
  it('should render a Header component', () => {
    const { getByAltText } = render(<Header />);
    const logo = getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });
});
