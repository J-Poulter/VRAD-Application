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
  listings: PropTypes.object.isRequired,
}

export default ListingCardContainer;
