import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Form from '../components/Form';

describe('<Form/>', () => {
  afterEach(cleanup);
  it('should render a Form component', () => {
    const { getByTestId } = render(<Form />);
    const textField = getByTestId('trackInput');
    const button = getByTestId('submit');
    expect(textField).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  it('should update data on change event', () => {
    const props = {
      track: 'uyo meyo',
      nextLyric: jest.fn()
    };
    const { getByTestId } = render(<Form {...props} />);
    const textField = getByTestId('trackInput');
    expect(textField).toHaveValue('');
    fireEvent.change(textField, { target: { value: 'sensima' } });
    expect(textField).toHaveValue('sensima');
  });
  it('check if track title is incorrect and close button close notification', () => {
    const props = {
      track: 'uyo meyo',
      nextLyric: jest.fn()
    };

    const { getByTestId } = render(<Form {...props} />);
    const textField = getByTestId('trackInput');
    fireEvent.change(textField, { target: { value: 'sensima' } });
    fireEvent.click(getByTestId('submit'));
    expect(getByTestId('error')).toBeInTheDocument();
    fireEvent.click(getByTestId('close'));
    expect(getByTestId('error')).not.toBeVisible();
  });
  it('check if track title is correct', () => {
    const props = {
      track: 'cassanova',
      nextLyric: jest.fn()
    };

    const { getByTestId } = render(<Form {...props} />);
    const textField = getByTestId('trackInput');
    fireEvent.change(textField, { target: { value: 'cassanova' } });
    fireEvent.click(getByTestId('submit'));
    expect(getByTestId('success')).toBeInTheDocument();
  });
});
