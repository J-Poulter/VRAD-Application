import { cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getAreas, getAreaDetails, getListings } from './apiCalls';
import { BASE } from '../constants/constants'

const mockAreaResponse = {
  areas: [
    {
      area: "RiNo",
      details: '/api/v1/areas/590'
    },
    {
      area: "Park Hill",
      details: '/api/v1/areas/751'
    }
  ]
}


describe('getAreas', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockAreaResponse)
      })
    })
  })

  afterEach(cleanup);

  it('should call fetch with the correct url', () => {
    getAreas();
    expect(window.fetch).toHaveBeenCalledWith(`${BASE}/api/v1/areas`)
  })

  it('should return an array of areas', () => {
    expect(getAreas()).resolves.toEqual(mockAreaResponse);
  })

  it('should throw an error when status is not 200', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
      })
    })

    expect(getAreas()).rejects.toEqual(Error())
  })

  it('should reject when failing to fetch', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('Failed to fetch'))
    })

    expect(getAreas()).rejects.toEqual(Error('Failed to fetch'))
  })
})

describe('getAreaDetails', () => {
  const mockAreaDetailResponse = [
    {
    "shortname": "RiNo",
    "id": 590,
    "name": "River North",
    "location": "North of Downtown Denver",
    "about": "RiNo is a burgeoning area with new bars, restaurants and event spaces popping up all the time. Explore this thriving area of Denver today!",
    "region_code": 6356834,
    "quick_search": "o5kod9f5cqo0",
    "listings": [
      "/api/v1/listings/3",
      "/api/v1/listings/44",
      "/api/v1/listings/221",
      "/api/v1/listings/744",
      "/api/v1/listings/90",
      "/api/v1/listings/310"
    ]
  },
  {
    "shortname": "Park Hill",
    id: 751,
    name: "Park Hill",
    location: "East of Downtown Denver",
    about: "Park Hill features one of the best views of the downtown area and surrounding mountains. With easy access to City Park and the major highways, Park Hill also includes many unique styles of homes.",
    region_code: 6648386,
    quick_search: "g1m0tsxzl0o0",
    listings: [
      '/api/v1/listings/3921',
    '/api/v1/listings/56',
    '/api/v1/listings/21',
    ]
  }
  ]

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve()
      })
    })
  })

  afterEach(cleanup);

  it('should call fetch with the correct url for each area', () => {
    getAreaDetails(mockAreaResponse);
    expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(window.fetch).toHaveBeenCalledWith(`${BASE}/api/v1/areas/590`);
    expect(window.fetch).toHaveBeenCalledWith(`${BASE}/api/v1/areas/751`);
  })

  it('should return an array of areaDetails', () => {
    window.fetch = jest.fn()
      .mockImplementationOnce(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockAreaDetailResponse[0])
        })
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockAreaDetailResponse[1])
        })
      })

    expect(getAreaDetails(mockAreaResponse)).resolves.toMatchObject(mockAreaDetailResponse);
  })

  it('should throw an error when status is not 200', () => {
    window.fetch = jest.fn()
      .mockImplementation(() => {
        return Promise.resolve({
          ok: false
        })
      })

      expect(getAreaDetails(mockAreaResponse)).rejects.toEqual(Error());
  })

  it('should reject when failing to fetch', () => {
    window.fetch = jest.fn()
      .mockImplementation(() => {
        return Promise.reject(Error('Failed to fetch'))
      });

      expect(getAreaDetails(mockAreaResponse)).rejects.toEqual(Error('Failed to fetch'));
  })
})

describe('getListings', () => {
  const mockAreaListings = [
      "/api/v1/listings/3",
      "/api/v1/listings/44",
    ]


  const mockListingsResponse = [
    {
      "listing_id": 3,
      "area_id": 590,
      "name": "Hip RiNo Party Spot",
      "address": {
        "street": "2250 Lawrence St",
        "zip": "80205"
      },
      "details": {
        "neighborhood_id": 5124122,
        "superhost": true,
        "seller_source": "91jss1",
        "beds": 3,
        "baths": 2.5,
        "cost_per_night": 420,
        "features": [
          "hot tub",
          "espresso machine"
        ]
      },
      "dev_id": "u4gh2j",
      "area": "rino",
      "db_connect": 834470
    },
    {
      "listing_id": 44,
      "area_id": 590,
      "name": "Lowkey Industrial Chic",
      "address": {
        "street": "2441 Broadway Ave",
        "zip": "80205"
      },
      "details": {
        "neighborhood_id": 5124122,
        "superhost": true,
        "seller_source": "91jss1",
        "beds": 1,
        "baths": 1.5,
        "cost_per_night": 220,
        "features": [
          "city views",
          "industrial motif",
          "rooftop"
        ]
      },
      "dev_id": "jaenku",
      "area": "rino",
      "db_connect": 694530
    }
  ]

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve()
      })
    })
  })

  afterEach(cleanup);

  it('should call fetch with the correct url for each area', () => {
    getListings(mockAreaListings);
    expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(window.fetch).toHaveBeenCalledWith(`${BASE}/api/v1/listings/3`);
    expect(window.fetch).toHaveBeenCalledWith(`${BASE}/api/v1/listings/44`);
  })

  it('should return an array of listings', () => {
    window.fetch = jest.fn()
      .mockImplementationOnce(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockListingsResponse[0])
        })
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockListingsResponse[1])
        })
      })

    expect(getListings(mockAreaListings)).resolves.toMatchObject(mockListingsResponse);
  })

  it('should throw an error when status is not 200', () => {
    window.fetch = jest.fn()
      .mockImplementation(() => {
        return Promise.resolve({
          ok: false
        })
      })

    expect(getListings(mockAreaListings)).rejects.toEqual(Error());
  })

  it('should reject when failing to fetch', () => {
    window.fetch = jest.fn()
      .mockImplementation(() => {
        return Promise.reject(Error('Failed to fetch'))
      });

    expect(getListings(mockAreaListings)).rejects.toEqual(Error('Failed to fetch'));
  })
})
