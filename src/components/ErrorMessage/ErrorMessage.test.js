import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ErrorMessage from './ErrorMessage';

function renderErrorMessage(props) {
  const utils = render(
    <BrowserRouter>
      <ErrorMessage {...props} />
    </BrowserRouter>
  )
  return {...utils}
}

const mockError = Error('mockMessage')

it('shoulder render an error if passed an error', () => {
  const { getByText } = renderErrorMessage({
    error: mockError
  });

  expect(getByText('Error: mockMessage')).toBeInTheDocument();
})
