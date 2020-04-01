import React from 'react';
import { cleanup, render, getByLabelText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import ListingCardContainer from './ListingCardContainer';

describe('ListingCard', () => {
  const mockListings = [
    {
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
    },
    {
      "listing_id": 44,
      "area_id": 590,
      "name": "Lowkey Industrial Chic",
      "address": {
        "street": "2441 Broadway Ave",
        "zip": 80205
      },
      "details": {
        "neighborhood_id": 5124122,
        "superhost": true,
        "seller_source": "91jss1",
        "beds": 1,
        "baths": 1.5,
        "cost_per_night": 220,
        "features": [
          "city views",
          "industrial motif",
          "rooftop"
        ]
      },
      "dev_id": "jaenku",
      "area": "rino",
      "db_connect": 694530
    }
  ]

  afterEach(cleanup)

  it('should render the correct content', () => {
    const { getAllByText, getByAltText, getByText } = render(
      <BrowserRouter>
        <ListingCardContainer
          error={null}
          listings={mockListings}
          isLoading={false}
        />
      </BrowserRouter>
    );

    const listingCardTitle = getByText('Hip RiNo Party Spot');
    const listingCardImage = getByAltText('Hip RiNo Party Spot');
    const listingCardButtons = getAllByText('View Details');

    expect(listingCardTitle).toBeInTheDocument();
    expect(listingCardImage).toBeInTheDocument();
    expect(listingCardButtons).toHaveLength(2);
  })

  it('should be able to inform the user if there are no listings available', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ListingCardContainer
          error={null}
          listings={[]}
          isLoading={false}
        />
      </BrowserRouter>
    );
    const emptyListingContainer = getByText('No listings!');
    expect(emptyListingContainer).toBeInTheDocument;
  })
})
