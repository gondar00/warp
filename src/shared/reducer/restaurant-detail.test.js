
import { fromJS } from 'immutable'

import restaurantDetailReducer from './restaurant-detail'

const initialState = fromJS({ isFetching: true, restaurants: [] })

describe('RESTAURANT  DETAIL REDUCER', () => {
  test('Should return the initial state', () => {
    expect(restaurantDetailReducer(undefined, {})).toEqual(initialState)
  })
})
