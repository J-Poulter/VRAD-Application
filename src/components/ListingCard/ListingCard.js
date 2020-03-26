import React from 'react'
import PropTypes from 'prop-types';

const ListingCard = ({ listing }) => {
  const { address, area, details, name } = listing;
  const features = details.features.map(feature => {
    return <li>{feature}</li>
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
      <img src="" alt=""/>
    </article>
  )
}

ListingCard.propTypes = {
  listing: PropTypes.object.isRequired,
}

export default ListingCard;
