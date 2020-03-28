import React from 'react';
import PropTypes from 'prop-types';
import './ListingCardContainer.css';

// components ------------------------------
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ListingCard from '../ListingCard/ListingCard';
import Spinner from '../Spinner/Spinner';

const ListingCardContainer = ({ error, isLoading, listings }) => {
  const renderedListingCards = listings.map(listing => {
    return <ListingCard
            key={listing.listing_id}
            listing={listing}
          />
  })

  const renderContent = () => {
    if(renderedListingCards.length) {
      return renderedListingCards
    }  else {
      return <h2>No listings!</h2>
    }
  }

  return (
    <>
      {error && <ErrorMessage error={error} />}
      {isLoading && <Spinner />}
      <section className="listing-card-container">
        {renderContent()}
      </section>
    </>
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
