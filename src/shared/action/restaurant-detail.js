// @flow

import { createAction } from 'redux-actions'
import { getYelpAuthToken } from './restaurant-list'
import ApiRequest from '../lib/api'
import Storage from '../lib/storage'
import { isEmpty } from '../lib/validation'

export const RESTAURANT_DETAIL_REQUEST = 'RESTAURANT_DETAIL_REQUEST'
export const RESTAURANT_DETAIL_SUCCESS = 'RESTAURANT_DETAIL_SUCCESS'
export const RESTAURANT_DETAIL_FAILURE = 'RESTAURANT_DETAIL_FAILURE'

const restaurantDetailRequest = createAction(RESTAURANT_DETAIL_REQUEST)
const restaurantDetailSuccess = createAction(RESTAURANT_DETAIL_SUCCESS)
const restaurantDetailFailure = createAction(RESTAURANT_DETAIL_FAILURE)

const getAllRestaurantInfo = async (id) => {
  const yelpAuthToken = Storage.get('y_a')
  // 1. If yelp token is not available in localStorage
  if (isEmpty(yelpAuthToken)) {
    getYelpAuthToken()
  }

  // 2.If token is available
  const restaurantDetail = await ApiRequest.getRestaurantDetail.get(id)
  const restaurantReviews = await ApiRequest.getRestaurantReviews.get(id)
  if (!isEmpty(restaurantDetail) && restaurantReviews.reviews.length > 0) {
    Storage.set(
      'restaurantDetail',
      JSON.stringify({
        data: restaurantDetail,
        reviews: restaurantReviews.reviews,
      }),
    )

    return Promise.resolve({
      data: restaurantDetail,
      reviews: restaurantReviews.reviews,
    })
  }
  return Promise.reject(
    'Error occured while fetching restaurant Information!!!',
  )
}

export function getRestaurant(id) {
  return (dispatch) => {
    dispatch(restaurantDetailRequest())
    return getAllRestaurantInfo(id).then(
      (data) => {
        dispatch(restaurantDetailSuccess(data))
      },
      (err) => {
        dispatch(restaurantDetailFailure(err))
      },
    )
  }
}

const addReviewToLS = (newReview) => {
  const review = {
    text: newReview.comments,
    rating: newReview.rating,
    time_created: new Date().toString(),
    user: {
      name: newReview.name,
    },
  }
  const restaurantDetail = JSON.parse(Storage.get('restaurantDetail'))
  return Promise.resolve({
    data: restaurantDetail.data,
    reviews: [...restaurantDetail.reviews, review],
  })
}
export function addReview(newReview) {
  return (dispatch) => {
    dispatch(restaurantDetailSuccess())
    return addReviewToLS(newReview).then(
      (data) => {
        dispatch(restaurantDetailSuccess(data))
      },
      (err) => {
        dispatch(restaurantDetailFailure(err))
      },
    )
  }
}
