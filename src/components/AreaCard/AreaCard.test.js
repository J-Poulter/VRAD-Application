import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import AreaCard from './AreaCard';
import { BrowserRouter } from 'react-router-dom';

describe('AreaCard', () => {
  let areaCard;
  const mockHandleViewListingsClick = jest.fn();
  const mockArea = {
      "shortname": "RiNo",
      "id": 590,
      "name": "River North",
      "location": "North of Downtown Denver",
      "about": "RiNo is a burgeoning area",
      "region_code": 6356834,
      "quick_search": "o5kod9f5cqo0",
      "listings": [
        "/api/v1/listings/3"
      ]
    };
  
  beforeEach(() => {
    areaCard = render(
      <BrowserRouter>
        <AreaCard
          area={mockArea}
          handleViewListingsClick={mockHandleViewListingsClick}
          key={590}
        />
      </BrowserRouter>
    )
  })
  
  afterEach(cleanup)

  it('should render the correct content', () => {

  })


})
