import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserProfile from './UserProfile';

describe('UserProfile', () => {

  function renderUserProfile(props) {
    const utils = render(
      <BrowserRouter>
        <UserProfile {...props} />
      </BrowserRouter>
      )
    return {...utils}
  }

  const mockFavorites = 4;
  const mockPurpose = 'mockPurpose';
  const mockUsername = 'mockUsername';

  afterEach(cleanup)

  it('should render the correct content', () => {
    const { debug, getByText } = renderUserProfile({
      favorites: mockFavorites,
      purpose: mockPurpose,
      username: mockUsername,
    })

    expect(getByText(`Welcome, ${mockUsername}!`)).toBeInTheDocument();
    expect(getByText(`Current travel purpose: ${mockPurpose}.`)).toBeInTheDocument();
    expect(getByText(`Favorites(${mockFavorites})`)).toBeInTheDocument();
  })
})
