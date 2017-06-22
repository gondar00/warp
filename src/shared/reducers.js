// @flow

import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'
// TODO: instead of loading all reducers individually make an index.js file that passes all
import restaurantList from './reducer/restaurant-list'
import restaurantDetail from './reducer/restaurant-detail'

/* eslint-disable */
export const reducers = {
  router,
  form,
  restaurantList,
  restaurantDetail,
}
/* eslint-enable */
