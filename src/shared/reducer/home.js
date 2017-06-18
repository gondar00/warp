// @flow

import { fromJS } from 'immutable'

import {
  RESTUARANT_LIST_REQUEST,
  RESTUARANT_LIST_SUCCESS,
  RESTUARANT_LIST_FAILURE,
} from '../action/home'

const initialState = fromJS({ isFetching: true, restuarants: {} })

const homeReducer = (
  state = initialState,
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case RESTUARANT_LIST_REQUEST:
      return state.set('isFetching', true)
    case RESTUARANT_LIST_SUCCESS:
      return state.set('isFetching', false).set('restuarants', fromJS(action.payload))
    case RESTUARANT_LIST_FAILURE:
      return state.set('isFetching', false)
    default:
      return state
  }
}

export default homeReducer
