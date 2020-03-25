import { cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getAreas, getAreaListings } from './apiCalls';

describe('getAreas', () => {
  const mockResponse = {
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

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })
    })
  })

  afterEach(cleanup);

  it('should call fetch with the correct url', () => {
    getAreas();
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:3001/api/v1/areas')
  })

  it('should return an array of areas', () => {
    expect(getAreas()).resolves.toEqual(mockResponse);
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
