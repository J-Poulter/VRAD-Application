import React from 'react';
import './AreaCardContainer.css';
import AreaCard from '../AreaCard/AreaCard';

const AreaCardContainer = (props) => {
  const areas = props.areaDetails.map(area => (
    <AreaCard area={area}/>
  ))

  return (
    <section className="areaCardsContainer">
      {areas}
    </section>
  )
}

export default AreaCardContainer;