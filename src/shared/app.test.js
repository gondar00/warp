import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import App from './app'

const middlewares = []
const mockStore = configureStore(middlewares)

describe('<App />', () => {
  it('renders snapshot', () => {
    const store = mockStore({})
    const WrapperComp = shallow(
      <Provider store={store}><App /></Provider>,
    )
    expect(shallowToJson(WrapperComp)).toMatchSnapshot()
  })
})
