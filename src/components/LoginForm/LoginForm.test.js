import React from 'react';
import { cleanup, fireEvent, render, findByDisplayValue } from '@testing-library/react';
import '@testing-library/jest-dom'
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  let utils;
  const mockHandleLoginSubmit = jest.fn()

  beforeEach(() => {
    utils = render(
      <LoginForm handleLoginSubmit={mockHandleLoginSubmit} />
    );
  })

  afterEach(cleanup)


  it('should render the correct content', () => {
    const { getByLabelText } = utils;

    expect(getByLabelText('Username:')).toBeTruthy();
    expect(getByLabelText('Email:')).toBeTruthy();
    expect(getByLabelText('Purpose:')).toBeTruthy();
  })

  it('should update state on input change', () => {
    const { findByDisplayValue, findByText, getByLabelText } = utils;
    expect(getByLabelText('Username:').value).toBe('');

    fireEvent.change(getByLabelText('Username:'), {
      target: {value: 'mockUsername'}
    });
    expect(getByLabelText('Username:').value).toBe('mockUsername');

    fireEvent.change(getByLabelText('Email:'), {
      target: {value: 'mockEmail'}
    });
    expect(getByLabelText('Email:').value).toBe('mockEmail');

    getByLabelText('Purpose:').value = "business";
    fireEvent.change(getByLabelText('Purpose:'), { target: { value: "business" } });

    expect(getByLabelText('Purpose:').value).toBe('business');
  })

  it('should invoke handleLoginSubmit', () => {
    const { getByLabelText, getByText } = utils;
    fireEvent.change(getByLabelText('Username:'), {
      target: { value: 'mockUsername' }
    });

    fireEvent.change(getByLabelText('Email:'), {
      target: { value: 'mockEmail' }
    });

    getByLabelText('Purpose:').value = "other";
    fireEvent.change(getByLabelText('Purpose:'), { target: { value: "other" } });

  fireEvent.click(getByText('Log In'));

  expect(mockHandleLoginSubmit).toHaveBeenCalledWith({
      username: 'mockUsername',
      email: 'mockEmail',
      purpose: 'other',
    })
  })
})
