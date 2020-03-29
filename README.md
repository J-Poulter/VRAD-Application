# What's New

1. [Abstract](#1-abstract)
2. [Technology](#2-technology)
3. [Installation](#3-installation)

![vrad](https://user-images.githubusercontent.com/44818815/77839830-a4337180-713d-11ea-8a49-de693cf0b974.gif)

### 1. Abstract

Vacation Rentals Around Denver is a simplified, fake version of a service similar to AirBnB. Users may authenticate via a fake log in form to view listings. There is no actual authentication as it was not within the scope of learning goals for this project. The application performs an initial network request to a nested endpoint and uses an array of endpoints from the initial fetch to perform a series of additional fetches that are passed into a Promise.all() for resolution. Additional data is fetched based upon the user's actions.

The major learning goal of this project was to utilize the React Router library to build and synchronize routes for the user's actions. To that end, dynamic routes were created following RESTful guidelines to keep the UI synchronized with the URL.

Additional concepts explored:

1. Writing unit tests with Jest and React Testing Library, including tests for some asynchronous functionality
2. Writing integration tests with Jest and React Testing Library
3. Utilizing the PropTypes library for type checking of props
4. Making nested fetch requests
5. `async/await` and `try/catch` syntax
6. Conditional rendering of components
7. Controlled components for forms
8. Error handling

### 2. Technology

- React
- React Router
- PropTypes
- Jest
- React testing library
- Webpack

### 3. Installation

Front end:

1. Fork and/or clone this repo
2. Change into the directory
3. Install dependencies via `npm install`
4. Start webpack-dev-server via `npm run start`

Back end:

1. Fork and/or clone the following repo https://github.com/turingschool/VRAD-API
2. Change into the directory
3. Install dependencies via `npm install`
4. Start the server via `npm run start`
5. You will need to have this server running on `localhost:3001`
