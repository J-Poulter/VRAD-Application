import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Spinner from './Spinner';

function renderSpinner(props) {
  const utils = render(
    <BrowserRouter>
      <Spinner {...props} />
    </BrowserRouter>
  )
  return { ...utils }
}

it('should render the correct content', () => {
  const { getByText } = renderSpinner();

  expect(getByText('Loading...')).toBeInTheDocument();
})
