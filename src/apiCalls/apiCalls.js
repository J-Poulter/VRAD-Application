import { BASE } from '../constants/constants'

export const getAreas = () => {
  return fetch(`${BASE}/api/v1/areas`)
  .then(response => {
    if(!response.ok) {
      throw Error(response.statusText);
    }

    return response.json();
  })
}

export const getAreaDetails = (areas) => {
  const promises = areas.areas.map(area => {
    const { area: shortname, details } = area;
    return fetch(`${BASE}${details}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(areaData => {
        return {
          shortname,
          ...areaData
        }
      })
  })

  return Promise.all(promises);
}
