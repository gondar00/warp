// @flow

import { fromJS } from 'immutable'

import {
  RESTAURANT_DETAIL_REQUEST,
  RESTAURANT_DETAIL_SUCCESS,
  RESTAURANT_DETAIL_FAILURE,
} from '../action/restaurant-detail'

const initialState = fromJS({ isFetching: true, restaurant: [] })

const restaurantDetail = (
  state = initialState,
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case RESTAURANT_DETAIL_REQUEST:
      return state.set('isFetching', true)
    case RESTAURANT_DETAIL_SUCCESS:
      return state.set('isFetching', false).set('restaurant', fromJS(action.payload))
    case RESTAURANT_DETAIL_FAILURE:
      return state.set('isFetching', false)
    default:
      return state
  }
}

export default restaurantDetail
