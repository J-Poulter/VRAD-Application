import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import AreaCard from './AreaCard';

describe('AreaCard', () => {
  let areaCard
  const mockHandleViewListingsClick = jest.fn()
  
  beforeEach(() => {
    areaCard = render(
      <AreaCard
        area={}
        handleViewListingsClick={mockHandleViewListingsClick}
        key={}
      />
    )
  })
  
  afterEach(cleanup)

  it('should render the correct content', () => {

  })

  it('should invoke handleViewListingsClick on click', () => {

  })
})
