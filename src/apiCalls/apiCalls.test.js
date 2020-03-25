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

  it('should call fetch with the correct url', () => {
    getAreas();
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:3001/api/v1/areas')
  })




})
