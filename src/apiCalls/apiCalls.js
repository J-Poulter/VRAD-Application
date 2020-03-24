import { BASE } from '../constants/constants'

export const getAreas = () => {
  return fetch(`${BASE}/api/v1/areas`)
  .then(response => response.json())
}

export const getAreaDetails = (areas) => {
  const promises = areas.map(area => {
    const { area: shortname, details } = area;
    return fetch(`${BASE}${details}`)
      .then(response => response.json())
      .then(areaData => {
        return {
          shortname,
          ...areaData
        }
      })
  })

  return Promise.all(promises);
}
