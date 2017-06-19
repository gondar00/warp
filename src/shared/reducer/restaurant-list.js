// @flow

import { fromJS } from 'immutable'

import {
  RESTAURANT_LIST_REQUEST,
  RESTAURANT_LIST_SUCCESS,
  RESTAURANT_LIST_FAILURE,
} from '../action/home'

const initialState = fromJS({ isFetching: false, restaurants: [] })

const homeReducer = (
  state = initialState,
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case RESTAURANT_LIST_REQUEST:
      return state.set('isFetching', true)
    case RESTAURANT_LIST_SUCCESS:
      return state.set('isFetching', false).set('restaurants', fromJS(action.payload))
    case RESTAURANT_LIST_FAILURE:
      return state.set('isFetching', false)
    default:
      return state
  }
}

export default homeReducer
