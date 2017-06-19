// @flow

import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'
// TODO: instead of loading all reducers individually make an index.js file that passes all
import home from './reducer/home'
import restaurantList from './reducer/restaurant-list'

/* eslint-disable */
export const reducers = {
  router,
  form,
  home,
  restaurantList,
}
/* eslint-enable */
