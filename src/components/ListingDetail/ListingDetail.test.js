import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListingDetail from './ListingDetail';

function renderListingDetail(props) {
  const mockHandleAddFavoriteClick = jest.fn();

  const utils = render(
    <BrowserRouter>
      <ListingDetail
        handleAddFavoriteClick={mockHandleAddFavoriteClick}
        {...props}
      />
    </BrowserRouter>
  )

  return {...utils, mockHandleAddFavoriteClick}
}

const mockListing = {
  "area": "RiNo",
  "listing_id": 3,
  "area_id": 590,
  "name": "Hip RiNo Party Spot",
  "address": {
    "street": "2250 Lawrence St",
    "zip": "80205"
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
  }
}

describe('ListingDetail', () => {

  afterEach(cleanup)

  it('should render the correct content', () => {
    const mockIsListingFavorite = jest.fn(() => false)
    const { getByAltText, getByText } = renderListingDetail({
      listing: mockListing,
      isListingFavorite: mockIsListingFavorite
    })

    expect(getByText(`Area: ${mockListing.area}`)).toBeInTheDocument();
    expect(getByText(`${mockListing.address.street}`)).toBeInTheDocument();
    expect(getByText(`Denver, CO ${mockListing.address.zip}`)).toBeInTheDocument();
    expect(getByText(`Beds: ${mockListing.details.beds}`)).toBeInTheDocument();
    expect(getByText(`Baths: ${mockListing.details.baths}`)).toBeInTheDocument();
    expect(getByText(`Features:`)).toBeInTheDocument();
    expect(getByAltText(`listing 1`)).toBeInTheDocument();
    expect(getByAltText(`listing 2`)).toBeInTheDocument();
    expect(getByAltText(`listing 3`)).toBeInTheDocument();
    expect(getByText(`Add to Favorites`)).toBeInTheDocument();
  })

  it('should remove from favorites if already favorite', () => {
    const mockIsListingFavorite = jest.fn(() => true)
    const { getByText, mockHandleAddFavoriteClick } = renderListingDetail({
      listing: mockListing,
      isListingFavorite: mockIsListingFavorite
    })

    expect(getByText('Remove from Favorites')).toBeInTheDocument();

    fireEvent.click(getByText('Remove from Favorites'));
    expect(mockHandleAddFavoriteClick).toHaveBeenCalledTimes(1);
    expect(mockHandleAddFavoriteClick).toHaveBeenCalledWith(mockListing);
  })
})
