# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), but later ejected for reasons that will be explained later on.

## Setup

Please create a .env file in the root dir with `REACT_APP_YELP_API_KEY=<Yelp API KEY>`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### How I spent my time

- 2 hours of implementation. This includes:
  - Learning the Yelp API
  - Creating hooks to call into the Yelp API
  - State management to adjust our search params with the click of a button
  - Components to display nearby Boba businesses and some basic information about them
  - Buttons to update search params
  - Buttons are disabled if they would not have an effect
  - Basic css so the page is useable
- 1.5 hours of testing:
  - Trying use 'msw' to mock our API call
  - Ejecting from the react create app bootstrap to try to get 'msw' to work
  - Could not get msw to work, gave up and fellback to mocking `fetch` with Jest
  - Testing all states that our app could be in:
    - No location selected
    - Location selected + defaults
    - Sorting results
    - Changing offset
    - API request failurse
    - Changing locations
- 30 minutes misc:
  - Refactoring parent/child components
  - Documentation
  - This readme

### What I wish I did but didn't have time to do

- Prune unused assets and node modules
- Make the page look nicer
- Better API unit testing with 'msw'
- We could probably utilize useReducer and useContext to manage our search param states rather than prop drilling
- The callbacks especially that we're prop drilling seem smelly, useContext would be able to fix that
- There should probably be some way to click a boba store to open it on maps
