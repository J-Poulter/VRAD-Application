import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PageNotFound from './PageNotFound';

function renderPageNotFound(props) {
  const utils = render(
    <BrowserRouter>
      <PageNotFound {...props} />
    </BrowserRouter>
  )
  return {...utils}
}

it('should render the correct content', () => {
  const { getByText } = renderPageNotFound()

  expect(getByText('The page you\'ve requested does not exist.')).toBeInTheDocument();
  expect(getByText('Return to sign in')).toBeInTheDocument();
})
