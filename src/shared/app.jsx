// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import HomePage from './container/page/home'
import RestaurantListPage from './container/page/restaurant-list'
import RestaurantDetailPage from './container/page/restaurant-detail'
import Footer from './component/footer'
import Nav from './component/nav'
import NotFoundPage from './container/page/not-found'
import { APP_NAME } from './config'
import {
  HOME_PAGE_ROUTE,
  RESTAURANT_LIST_ROUTE,
  RESTAURANT_DETAIL_ROUTE,
} from './routes'

const App = () =>
  <div style={{ paddingTop: 54 }}>
    <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
    <Nav />
    <Switch>
      <Route exact path={HOME_PAGE_ROUTE} render={props => <HomePage {...props} />} />
      <Route path={RESTAURANT_LIST_ROUTE} render={props => <RestaurantListPage {...props} />} />
      <Route exact path={RESTAURANT_DETAIL_ROUTE} render={props => <RestaurantDetailPage {...props} />} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>

export default App
