import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ListingCard.css';

const ListingCard = ({ listing }) => {
  const { area_id, listing_id, name } = listing;

  return (
    <article className="listing-card">
      <div className="listing-card-header">
        <p className="listing-card-title">{name}</p>
      </div>
      <div className="listing-card-body">
        <img
          className="listing-card-image"
          src={`/images/${listing_id}_a.jpg`}
          alt={name}
        />
      </div>
      <div className="listing-card-footer">
        <Link to={`/areas/${area_id}/listings/${listing_id}`}>
          <button
            className="listing-card-button"
            type="button"
          >
            View Details
          </button>
        </Link>
      </div>
    </article>
  )
}

ListingCard.propTypes = {
  listing: PropTypes.shape({
    address: PropTypes.shape({
      street: PropTypes.string,
      zip: PropTypes.number,
    }),
    area: PropTypes.string,
    details: PropTypes.shape({
      baths: PropTypes.number,
      beds: PropTypes.number,
      cost_per_night: PropTypes.number,
      features: PropTypes.arrayOf(PropTypes.string),
      neighborhood_id: PropTypes.number,
      seller_source: PropTypes.string,
      superhost: PropTypes.bool,
    }),
    listing_id: PropTypes.number,
    name: PropTypes.string
  }).isRequired
}

export default ListingCard;
