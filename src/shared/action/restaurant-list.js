// @flow

import { createAction } from 'redux-actions'
import ApiRequest from '../lib/api'
import Storage from '../lib/storage'
import { isEmpty } from '../lib/validation'

export const RESTAURANT_LIST_REQUEST = 'RESTAURANT_LIST_REQUEST'
export const RESTAURANT_LIST_SUCCESS = 'RESTAURANT_LIST_SUCCESS'
export const RESTAURANT_LIST_FAILURE = 'RESTAURANT_LIST_FAILURE'

const restaurantListRequest = createAction(RESTAURANT_LIST_REQUEST)
const restaurantListSuccess = createAction(RESTAURANT_LIST_SUCCESS)
const restaurantListFailure = createAction(RESTAURANT_LIST_FAILURE)

export const getYelpAuthToken = async () => {
  const auth = await ApiRequest.getYelpAuthToken.get()
  Storage.set('y_a', auth.access_token)
}

const getAllRestaurants = async (params) => {
  const yelpAuthToken = Storage.get('y_a')
  // 1. If yelp token is not available in localStorage
  if (isEmpty(yelpAuthToken)) {
    getYelpAuthToken()
  }

  // // 2.If token is available
  const restaurants = await ApiRequest.getRestaurants.get(params)
  if (restaurants.businesses.length > 0) {
    return Promise.resolve(restaurants.businesses)
  }
  return Promise.reject('Error occured while fetching restaurants!!!')
}

export function getRestaurants(params) {
  return (dispatch) => {
    dispatch(restaurantListRequest())
    return getAllRestaurants(params).then(
      (data) => {
        dispatch(restaurantListSuccess(data))
      },
      (err) => {
        dispatch(restaurantListFailure(err))
      },
    )
  }
}
