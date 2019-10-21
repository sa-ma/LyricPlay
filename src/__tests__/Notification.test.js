import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Notification from '../components/Notification';

describe('<Notification/>', () => {
  it('should render a successfull Notification component', () => {
    const props = {
      variant: 'success',
      message: 'Correct'
    };
    const { getByTestId, getByRole } = render(<Notification {...props} />);
    const success = getByTestId('success');
    const successIcon = getByRole('alertdialog');
    expect(success).toBeInTheDocument();
    expect(successIcon).toBeInTheDocument();
  });
  it('should render an error Notification component', () => {
    const props = {
      variant: 'error',
      message: 'Wrong'
    };
    const { getByTestId, getByRole } = render(<Notification {...props} />);
    const error = getByTestId('error');
    const errorIcon = getByRole('alertdialog');
    expect(error).toBeInTheDocument();
    expect(errorIcon).toBeInTheDocument();
  });
});
