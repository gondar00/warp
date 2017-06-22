
import { fromJS } from 'immutable'

import restaurantListReducer from './restaurant-list'

const initialState = fromJS({ isFetching: true, restaurants: [] })

describe('RESTAURANT LIST REDUCER', () => {
  test('Should return the initial state', () => {
    expect(restaurantListReducer(undefined, {})).toEqual(initialState)
  })
})
