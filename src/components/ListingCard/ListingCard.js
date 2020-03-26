import React from 'react'
import PropTypes from 'prop-types';

const ListingCard = ({ listing }) => {
  const { address, area, details, listing_id, name } = listing;
  const features = details.features.map(feature => {
    return <li key={feature}>{feature}</li>
  })

  return (
    <article>
      <p>{name}</p>
      <p>Area: {area}</p>
      <p>{address.street}</p>
      <p>Denver, CO {address.zip}</p>
      <p>Beds: {details.beds}</p>
      <p>Baths: {details.baths}</p>
      <p>${details.cost_per_night}/night</p>
      <ul>{features}</ul>
      <img src={`/images/${listing_id}_a.jpg`} alt="test"/>
      <button type="button">View Details</button>
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
  }).isRequired,
  handleAddFavoriteClick: PropTypes.func.isRequired
}

export default ListingCard;
