import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import {
  RESTAURANT_LIST_REQUEST,
  RESTAURANT_LIST_SUCCESS,
  getRestaurants,
} from './restaurant-list'
import { restaurantListMock } from './__fixtures__/restaurant-list.fixture'

const mockStore = configureMockStore([thunk])
const store = mockStore({ isFetching: false, restaurants: [] })

const mockLatitude = '37.80587'
const mockLongitude = '-122.42058'

fetchMock.mock('*', { status: 200, body: restaurantListMock })

describe('RESTAURANT LIST ACTION', () => {
  it('creates RESTAURANT_LIST_SUCCESS when fetching from yelp api', async () => {
    const expectedActions = [
      { type: RESTAURANT_LIST_REQUEST },
      {
        type: RESTAURANT_LIST_SUCCESS,
        payload: restaurantListMock,
      },
    ]

    const response = await store.dispatch(
      getRestaurants({
        latitude: mockLatitude,
        longitude: mockLongitude,
      }),
    )
    expect(store.getActions()).toEqual(expectedActions)
  })
})
