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
    </article>
  )
}

ListingCard.propTypes = {
  listing: PropTypes.object.isRequired,
}

export default ListingCard;
