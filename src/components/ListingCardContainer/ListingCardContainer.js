import React from 'react';
import PropTypes from 'prop-types';

// components ------------------------------
import ListingCard from '../ListingCard/ListingCard';

const ListingCardContainer = ({ listings }) => {
  const renderedListingCards = listings.map(listing => {
    return <ListingCard
            key={listing.listing_id}
            listing={listing}
          />
  })

  return (
    <section>
      {renderedListingCards}
    </section>
  )
}

ListingCardContainer.propTypes = {
  listings: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.object,
    area: PropTypes.string,
    area_id: PropTypes.number,
    db_connect: PropTypes.number,
    details: PropTypes.shape({
      baths: PropTypes.number,
      beds: PropTypes.number,
      cost_per_night: PropTypes.number,
      features: PropTypes.arrayOf(PropTypes.string),
      neighborhood_id: PropTypes.number,
      seller_source: PropTypes.string,
      superhost: PropTypes.bool,
    }),
    dev_id: PropTypes.string,
    listing_id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired
}

export default ListingCardContainer;
