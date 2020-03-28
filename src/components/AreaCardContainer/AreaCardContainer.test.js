import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import AreaCardContainer from './AreaCardContainer';

describe('AreaCardContainer', () => {
  let areaCardContainer;

  beforeEach(() => {
    areaCardContainer = render(
      <AreaCardContainer 
        areaDetails={}
        error={}
        handleViewListingsClick={}
        isLoading={}
      />
    )
  })
  
  afterEach(cleanup)

  it('should render the correct content', () => {

  })

  it('should ')
})
