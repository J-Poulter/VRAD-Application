import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  afterEach(cleanup)
  
  const mockHandleLoginSubmit = jest.fn()

  it('should render the correct content', () => {
    const { getByLabelText } = render(
      <LoginForm handleLoginSubmit={mockHandleLoginSubmit}/>
    )
    expect(getByLabelText('Username:')).toBeInTheDocument();
  })
})