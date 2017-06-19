// @flow

import request from 'request'
import compression from 'compression'
import express from 'express'
import { Server } from 'http'
import socketIO from 'socket.io'

import routing from './routing'
import {
  WEB_PORT,
  STATIC_PATH,
  API_OPTIONS,
  YELP_CLIENT_ID,
  YELP_CLIENT_SECRET,
} from '../shared/config'
import { isProd } from '../shared/util'
import setUpSocket from './socket'

const app = express()
// flow-disable-next-line
const http = Server(app)
const io = socketIO(http)
setUpSocket(io)

app.use(compression())
app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))

//
// Wrap -> Yelp Apis
// -----------------------------------------------------------------------------

app.get('/v1/yelp/getAuth', (req, res) => {
  const form = {
    grant_type: 'client_credentials',
    client_id: YELP_CLIENT_ID,
    client_secret: YELP_CLIENT_SECRET,
  }
  request.post(
    { url: `${API_OPTIONS.yelpOrigin}/oauth2/token`, form },
    (err, httpResponse, body) => {
      if (err) throw new Error('Bad response from server')
      res.setHeader('Authorization', `Bearer ${JSON.parse(body).access_token}`)
      return res.json(body)
    },
  )
})

app.get('/v1/yelp/getRestaurants', (req, res) => {
  const qs = {
    latitude: req.query.latitude,
    longitude: req.query.longitude,
  }
  request.get(
    {
      url: `${API_OPTIONS.yelpOrigin}/v3/businesses/search`,
      qs,
      headers: {
        Authorization: req.headers.authorization,
      },
    },
    (err, httpResponse, body) => {
      if (err) throw new Error('Bad response from server')
      return res.json(JSON.parse(body))
    },
  )
})

//
// SSR
// -----------------------------------------------------------------------------

routing(app)

//
//  Start the server
// -----------------------------------------------------------------------------

http.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Server running on port ${WEB_PORT} ${isProd ? '(production)' : '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`,
  )
})
