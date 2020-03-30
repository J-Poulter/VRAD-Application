import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListingCard from './ListingCard';
import { BrowserRouter } from 'react-router-dom';

describe('ListingCard', () => {
  let listingCard;
  const mockListing = {
    "listing_id": 3,
    "area_id": 590,
    "name": "Hip RiNo Party Spot",
    "address": {
      "street": "2250 Lawrence St",
      "zip": 80205
    },
    "details": {
      "neighborhood_id": 5124122,
      "superhost": true,
      "seller_source": "91jss1",
      "beds": 3,
      "baths": 2.5,
      "cost_per_night": 420,
      "features": [
        "hot tub",
        "espresso machine"
      ]
    },
    "dev_id": "u4gh2j",
    "area": "rino",
    "db_connect": 834470
  };

  beforeEach(() => {
    listingCard = render(
      <BrowserRouter>
        <ListingCard
          key={590}
          listing={mockListing}
        />
      </BrowserRouter>
    )
  })

  afterEach(cleanup)

  it('should render the correct content', () => {
  const { debug, getByAltText, getByText } = listingCard;
    const listingCardTitle = getByText('Hip RiNo Party Spot');
    const listingCardImage = getByAltText('Hip RiNo Party Spot');
    const listingCardButton = getByText('View Details');

    expect(listingCardTitle).toBeInTheDocument();
    expect(listingCardImage).toBeInTheDocument();
    expect(listingCardButton).toBeInTheDocument();
  })

  it('should change the URL after clicking View Listings Button', () => {
    const { debug, getByAltText, getByText } = listingCard;
    const listingCardButton = getByText('View Details');
    fireEvent.click(listingCardButton);

    expect(location.pathname).toBe('/areas/590/listings/3');
  })  
})
