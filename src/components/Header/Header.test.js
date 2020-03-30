import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';

function renderHeader(props) {
  const mockHandleLogoutClick = jest.fn();
  const utils = render(
    <BrowserRouter>
      <Header handleLogoutClick={mockHandleLogoutClick} {...props} />;
    </BrowserRouter>
  )
  return {...utils, mockHandleLogoutClick}
}

describe('Header', () => {

  afterEach(cleanup)

  it('should render the correct content when not authenticated', () => {
    const { getByAltText, getByText } = renderHeader({
      isAuthenticated: false
    })

    expect(getByAltText('VRAD travel logo')).toBeInTheDocument();
    expect(getByText('VRAD')).toBeInTheDocument();
  })

  it('should render the correct content when authenticated', () => {
    const { getByText } = renderHeader({
      isAuthenticated: true
    })

    expect(getByText('Areas')).toBeInTheDocument();
    expect(getByText('Log Out')).toBeInTheDocument();
  })

  it('should log the user out', () => {
    const { getByText, mockHandleLogoutClick, queryByText, rerender } = renderHeader({
      isAuthenticated: true
    })

    fireEvent.click(getByText('Log Out'));
    expect(mockHandleLogoutClick).toHaveBeenCalledTimes(1);

    rerender(
      <BrowserRouter>
        <Header handleLogoutClick={mockHandleLogoutClick} isAuthenticated={false} />
      </BrowserRouter>
    )

    expect(queryByText('Areas')).not.toBeInTheDocument();
    expect(queryByText('Log Out')).not.toBeInTheDocument();
  })
})
