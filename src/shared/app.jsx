// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import HomePage from './container/page/home'
import RestuarantListPage from './container/page/restuarant-list'
import RestuarantDetailPage from './container/page/restuarant-detail'
import Footer from './component/footer'
import Nav from './component/nav'
import NotFoundPage from './container/page/not-found'
import { APP_NAME } from './config'
import {
  HOME_PAGE_ROUTE,
  RESTUARANT_LIST_ROUTE,
  RESTUARANT_DETAIL_ROUTE,
} from './routes'

const App = () =>
  <div style={{ paddingTop: 54 }}>
    <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
    <Nav />
    <Switch>
      <Route exact path={HOME_PAGE_ROUTE} render={() => <HomePage />} />
      <Route exact path={RESTUARANT_LIST_ROUTE} render={() => <RestuarantListPage />} />
      <Route exact path={RESTUARANT_DETAIL_ROUTE} render={() => <RestuarantDetailPage />} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>

export default App
