import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import {
  RESTAURANT_DETAIL_REQUEST,
  RESTAURANT_DETAIL_SUCCESS,
  getRestaurant,
} from './restaurant-detail'
import { restaurantDetailMock } from './__fixtures__/restaurant-detail.fixture'

const mockStore = configureMockStore([thunk])
const store = mockStore({ isFetching: false, restaurant: [] })

const mockId = 'cafe-de-casa-san-francisco-3'

fetchMock.mock('*', { status: 200, body: restaurantDetailMock })

describe('RESTAURANT LIST ACTION', () => {
  it('creates RESTAURANT_DETAIL_REQUEST when fetching from yelp api', async () => {
    const expectedActions = [
      { type: RESTAURANT_DETAIL_REQUEST },
      {
        type: RESTAURANT_DETAIL_SUCCESS,
        payload: restaurantDetailMock,
      },
    ]

    const response = await store.dispatch(
      getRestaurant(mockId),
    )
    expect(store.getActions()).toEqual(expectedActions)
  })
})
