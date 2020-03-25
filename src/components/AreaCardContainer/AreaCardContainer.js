import React from 'react';
import './AreaCardContainer.css';
import AreaCard from '../AreaCard/AreaCard';

const AreaCardContainer = ({areaDetails}) => {
  const areas = areaDetails.map(area => (
    <AreaCard area={area} key={area.id}/>
  ))

  return (
    <section className="area-cards-container">
      {areas}
    </section>
  )
}

export default AreaCardContainer;