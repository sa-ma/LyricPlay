import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Countries from '../components/Countries';

describe('<Countries/>', () => {
  it('should render a Countries component', () => {
    const props = {
      country: ''
    };
    const { getByTestId, getAllByRole } = render(<Countries {...props} />);
    const largeDevice = getByTestId('large-device-list');
    const smallDevice = getByTestId('small-device-list');
    const menuItem = getAllByRole('menuitem');
    expect(largeDevice).toBeInTheDocument();
    expect(menuItem.find((el) => el)).toBeInTheDocument();
    expect(smallDevice).toBeInTheDocument();
  });
  it('should change countries', async () => {
    const props = {
      country: 'ws',
      changeCountry: jest.fn()
    };
    const { getByTestId } = render(<Countries {...props} />);
    const smallDevice = getByTestId('small-device-list');
    expect(smallDevice).toHaveValue('ws');
    fireEvent.click(smallDevice, { target: { value: 'ng' } });
    expect(smallDevice).toHaveValue('ng');
  });
});
