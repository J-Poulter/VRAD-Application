import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('Header', () => {
  afterEach(cleanup)

  it('should render the correct content', () => {
      const { debug, getByAltText } = render(<Header />);
      expect(getByAltText('VRAD travel logo').tagName).toBe('IMG');
  })
})
