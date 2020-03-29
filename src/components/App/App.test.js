import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

function renderApp() {
  const utils = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )

  return {...utils}
}

describe('App', () => {
  afterEach(cleanup)

  it('should render the correct content', () => {
    const { getByTestId } = renderApp();

    expect(getByTestId('header')).toBeInTheDocument();
    expect(getByTestId('login-form')).toBeInTheDocument();
  })

  it('should render userprofile, area cards once logged in', () => {
    const { getByLabelText, getByText, getByTestId, queryByTestId } = renderApp();

    expect(getByTestId('header')).toBeInTheDocument();
    expect(getByTestId('login-form')).toBeInTheDocument();

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

    fireEvent.click(getByText('Log In'));

    expect(queryByTestId('login-form')).not.toBeInTheDocument();
    expect(getByTestId('user-profile')).toBeInTheDocument();
    expect(getByTestId('area-card-container')).toBeInTheDocument();
    expect(getByText('Areas')).toBeInTheDocument();
    expect(getByText('Log Out')).toBeInTheDocument();
  })
})


