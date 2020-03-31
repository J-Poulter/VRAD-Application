import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { cleanup, fireEvent, render, waitFor, getByLabelText, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { getAreas, getAreaDetails } from '../../apiCalls/apiCalls';
import LoginForm from '../LoginForm/LoginForm';

jest.mock('../../apiCalls/apiCalls')

describe('App', () => {
  let utils;
  beforeEach(() => {
    getAreas.mockResolvedValueOnce(
      {
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
    )
    getAreaDetails.mockResolvedValueOnce(
      [
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
    )
    utils = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )   
  })

  afterEach(cleanup)

  it('should render the correct content', () => {
    const { getByTestId } = utils;

    expect(getByTestId('header')).toBeInTheDocument();
    expect(getByTestId('login-form')).toBeInTheDocument();
  })

  it('should render UserProfile, AreaCardContainer, AreaCard, once logged in', async () => {
    
    const { debug, getByText, getByLabelText, getByTestId, queryByTestId } = utils;

    fireEvent.change(getByLabelText('Username:'), {
      target: {value: 'chucknorris'}
    })
    fireEvent.change(getByLabelText('Email:'), {
      target: {value: 'chucknorris@norris'}
    })
    getByLabelText('Purpose:').value = 'business'
    fireEvent.click(getByText('Log In'))
    expect(queryByTestId('login-form')).not.toBeInTheDocument()

    // AreaCard (present once fetch completes)
    await waitFor(() => {
      expect(getByTestId('user-profile')).toBeInTheDocument();
      expect(getByTestId('area-card-container')).toBeInTheDocument();
      expect(getByTestId('header')).toBeInTheDocument();
      expect(getByText('Areas')).toBeInTheDocument();
      expect(getByText('Log Out')).toBeInTheDocument();
      expect(getByText('RiNo')).toBeInTheDocument();
      expect(getByText('Park Hill')).toBeInTheDocument();
    })
    fireEvent.click(getByText('Log Out'));
    expect(getByTestId('login-form')).toBeInTheDocument();
  })
})


