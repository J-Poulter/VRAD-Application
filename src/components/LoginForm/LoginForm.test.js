import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { cleanup, fireEvent, render, findByDisplayValue } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from './LoginForm';

function renderLoginForm(props) {
  const mockHandleLoginSubmit = jest.fn();
  const utils = render(
    <BrowserRouter>
      <LoginForm handleLoginSubmit={mockHandleLoginSubmit} {...props} />
    </BrowserRouter>
  )
  return {...utils, mockHandleLoginSubmit}
}

describe('LoginForm', () => {

  afterEach(cleanup);

  it('should render the correct content', () => {
    const { getByLabelText, getByText } = renderLoginForm();

    expect(getByLabelText('Username:')).toBeInTheDocument();
    expect(getByLabelText('Email:')).toBeInTheDocument();
    expect(getByLabelText('Purpose:')).toBeInTheDocument();
    expect(getByText('Log In')).toBeInTheDocument();
    expect(getByText('Hello, Friend!')).toBeInTheDocument();
    expect(getByText('Log in to begin your vacation in Denver')).toBeInTheDocument();
  })

  it('should disable log in button until all inputs filled', () => {
    const { getByLabelText, getByText } = renderLoginForm();

    expect(getByText('Log In')).toHaveAttribute('disabled');

    fireEvent.change(getByLabelText('Username:'), {
      target: { value: 'mockUsername' }
    });
    expect(getByLabelText('Username:').value).toBe('mockUsername');

    fireEvent.change(getByLabelText('Email:'), {
      target: { value: 'mockEmail' }
    });
    expect(getByLabelText('Email:').value).toBe('mockEmail');

    getByLabelText('Purpose:').value = "business";
    fireEvent.change(getByLabelText('Purpose:'), { target: { value: "business" } });
    expect(getByLabelText('Purpose:').value).toBe('business');

    expect(getByText('Log In')).not.toHaveAttribute('disabled');
  });

  it('should update the welcome message with the username and purpose', () => {
    const { getByLabelText, getByText } = renderLoginForm();

    expect(getByText('Hello, Friend!')).toBeInTheDocument();
    expect(getByText('Log in to begin your vacation in Denver')).toBeInTheDocument();

    fireEvent.change(getByLabelText('Username:'), {
      target: { value: 'mockUsername' }
    });
    expect(getByText('Hello, mockUsername!')).toBeInTheDocument();

    getByLabelText('Purpose:').value = "business";
    fireEvent.change(getByLabelText('Purpose:'), { target: { value: "business" } });
    expect(getByText('Log in to begin your business in Denver')).toBeInTheDocument();
  });

  it('should invoke handleLoginSubmit with correct arguments', () => {
    const { getByLabelText, getByText, mockHandleLoginSubmit } = renderLoginForm();
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

    fireEvent.click(getByText('Log In'));

    expect(mockHandleLoginSubmit).toHaveBeenCalledTimes(1);
    expect(mockHandleLoginSubmit).toHaveBeenCalledWith({
      username: 'mockUsername',
      email: 'mockEmail',
      purpose: 'business',
    });
  });
});
