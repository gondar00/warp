// @flow

import { createAction } from 'redux-actions'
import ApiRequest from '../lib/api'
import Storage from '../lib/storage'
import { isEmpty } from '../lib/validation'

export const RESTUARANT_LIST_REQUEST = 'RESTUARANT_LIST_REQUEST'
export const RESTUARANT_LIST_SUCCESS = 'RESTUARANT_LIST_SUCCESS'
export const RESTUARANT_LIST_FAILURE = 'RESTUARANT_LIST_FAILURE'

export const restuarantListRequest = createAction(RESTUARANT_LIST_REQUEST)
export const restuarantListSuccess = createAction(RESTUARANT_LIST_SUCCESS)
export const restuarantListFailure = createAction(RESTUARANT_LIST_FAILURE)

const getAllRestuarants = async (params) => {
  const yelpAuthToken = Storage.get('y_a')
	// 1. If yelp token is not available in localStorage
  if (isEmpty(yelpAuthToken)) {
		const auth = await ApiRequest.getYelpAuthToken.get()
		Storage.set('y_a', auth)
	}

  // // 2.If token is available
  // const restuarants = await ApiRequest.getRestuarants.get(params)

  // if (restuarants.data.id > 0) {
  //   return Promise.resolve(restuarants.data)
  // }

  // return Promise.reject('Error occured while fetching restuarants!!!')
}

export function getRestuarants(params) {
  return (dispatch) => {
    dispatch(restuarantListRequest())
    return getAllRestuarants(params).then(
      (data) => {
        dispatch(restuarantListSuccess(data))
      },
      (err) => {
        dispatch(restuarantListFailure(err))
      },
    )
  }
}
