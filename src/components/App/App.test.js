import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

function setup() {
  const utils = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )

  const user = { username: 'mockUsername', email: 'mock@test.com', purpose: 'business' }
  const changeUsernameInput = value =>
    fireEvent.change(utils.getByLabelText('Username:'), { target: { value } })
  const changeEmailInput = value =>
    fireEvent.change(utils.getByLabelText('Email:'), { target: { value } })
  const changePurposeInput = value => {
    utils.getByLabelText('Purpose:').value = value;
    fireEvent.change(utils.getByLabelText('Purpose:'), { target: { value: value } });
  }
  const clickSubmit = () => fireEvent.click(utils.getByText('Log In'));

  return {
    ...utils,
    user,
    changeUsernameInput,
    changeEmailInput,
    changePurposeInput,
    clickSubmit,
  }
}

function loginSuccessCase() {
  const utils = setup()
  utils.changeUsernameInput(utils.user.username)
  utils.changeEmailInput(utils.user.email)
  utils.changePurposeInput(utils.user.purpose)
  utils.clickSubmit()
  return utils
}
afterEach(cleanup)

describe('App', () => {


  it('should render the correct content', () => {
    const { getByTestId } = setup();

    expect(getByTestId('header')).toBeInTheDocument();
    expect(getByTestId('login-form')).toBeInTheDocument();
  })

  it('should render UserProfile, AreaCardContainer, AreaCard, once logged in', async () => {
    const { getByText, getByTestId, queryByTestId } = loginSuccessCase();

    expect(getByTestId('header')).toBeInTheDocument();
    expect(queryByTestId('login-form')).not.toBeInTheDocument();
    expect(getByTestId('user-profile')).toBeInTheDocument();
    expect(getByTestId('area-card-container')).toBeInTheDocument();

    // Header
    expect(getByText('Areas')).toBeInTheDocument();
    expect(getByText('Log Out')).toBeInTheDocument();

    // Spinner (present while loading)
    expect(getByText('Loading...')).toBeInTheDocument();

    // AreaCard (present once fetch completes)
    await wait(() => {
      expect(getByText('RiNo')).toBeInTheDocument();
      expect(getByText('Park Hill')).toBeInTheDocument();
      expect(getByText('LoHi')).toBeInTheDocument();
      expect(getByText('Cap Hill')).toBeInTheDocument();
    })
  })

  it('it should show the login form after logging out', () => {
    const { getByTestId, getByText } = loginSuccessCase();

    fireEvent.click(getByText('Log Out'));
    expect(getByTestId('login-form')).toBeInTheDocument();
  })

  it('after logging in, it should switch to listing view when "View Listings" clicked', async () => {
    const { getByText } = loginSuccessCase();

    // AreaCard
    await wait(() => {
      fireEvent.click(getByText('VIEW LISTINGS'));
      expect(getByText('Hip RiNo Party Spot')).toBeInTheDocument();
    })
  })
})


