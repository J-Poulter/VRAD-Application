import React from 'react';
import PropTypes from 'prop-types'
import './ListingDetail.css';

const ListingDetail = ({ handleAddFavoriteClick, isListingFavorite, listing }) => {
  const { address, area, details, listing_id, name } = listing;
  const features = details.features.map(feature => {
    return <li key={feature}>{feature}</li>
  })

  return (
    <article className="listing-detail-container">
      <h4 className="listing-detail-title">{name}</h4>
      <h4 className="listing-detail-cost">${details.cost_per_night}/night</h4>
      <section className="listing-detail-header">
        <p>Area: {area}</p>
        <p>{address.street}</p>
        <p>Denver, CO {address.zip}</p>
        <p>Beds: {details.beds}</p>
        <p>Baths: {details.baths}</p>
        <p className="listing-detail-details">Features:</p>
        <ul>{features}</ul>
      </section>
      <section className="listing-detail-gallery">
        <img src={`/images/${listing_id}_a.jpg`} alt="listing 1" />
        <img src={`/images/${listing_id}_b.jpg`} alt="listing 2" />
        <img src={`/images/${listing_id}_c.jpg`} alt="listing 3" />
      </section>
      <section className="listing-detail-footer">
        <button
          onClick={() => handleAddFavoriteClick(listing)}
          type="button"
        >
          {isListingFavorite(listing_id)
            ? 'Remove from Favorites'
            : 'Add to Favorites'}
        </button>
      </section>
    </article>
  )
}

ListingDetail.propTypes = {
  listing: PropTypes.shape({
    address: PropTypes.shape({
      street: PropTypes.string,
      zip: PropTypes.string,
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
  }).isRequired,
  isListingFavorite: PropTypes.func.isRequired,
  handleAddFavoriteClick: PropTypes.func.isRequired
}

export default ListingDetail;
