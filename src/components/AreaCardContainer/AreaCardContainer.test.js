import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AreaCardContainer from './AreaCardContainer';
import { BrowserRouter } from 'react-router-dom';

describe('AreaCardContainer', () => {
  const mockHandleViewListingsClick = jest.fn();
  const mockAreaDetails = [
    {
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
    },
    {
      "shortname": "Park Hill",
      id: 751,
      name: "Park Hill",
      location: "East of Downtown Denver",
      about: "Park Hill features one of the best views",
      region_code: 6648386,
      quick_search: "g1m0tsxzl0o0",
      listings: [
        '/api/v1/listings/3921'
      ]
    }
  ];
  
  afterEach(cleanup)

  it('should render the correct content', () => {
    const { getAllByText, getByText } = render(
      <BrowserRouter>
        <AreaCardContainer
          areaDetails={mockAreaDetails}
          error={null}
          handleViewListingsClick={mockHandleViewListingsClick}
          isLoading={false}
        />
      </BrowserRouter>
    );

    const cardShortname = getByText('RiNo');
    const cardName = getByText('(River North)');
    const cardDescript = getByText('Park Hill features one of the best views');
    const cardButtons = getAllByText('View Listings');
    
    expect(cardShortname).toBeInTheDocument();
    expect(cardName).toBeInTheDocument();
    expect(cardDescript).toBeInTheDocument();
    expect(cardButtons).toHaveLength(2);
  })
})
