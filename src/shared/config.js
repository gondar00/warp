// @flow

export const WDS_PORT = 7000
export const STATIC_PATH = '/static'

export const APP_NAME = 'Warp App'

export const APP_CONTAINER_CLASS = 'warp-app'
export const APP_CONTAINER_SELECTOR = `.${APP_CONTAINER_CLASS}`
export const JSS_SSR_CLASS = 'jss-ssr'
export const JSS_SSR_SELECTOR = `.${JSS_SSR_CLASS}`

export const WEB_PROTOCOL = process.env.HTTPS === 'true' ? 'https' : 'http'
export const WEB_HOST = process.env.WEB_HOST || 'http://localhost'
export const WEB_PORT = process.env.WEB_PORT || 8000

export const YELP_CLIENT_ID = process.env.YELP_CLIENT_ID ||
  'GjM446MEYbhgdWyOA-1cGQ'
export const YELP_CLIENT_SECRET = process.env.YELP_CLIENT_SECRET || 'D1UekwsKDNcG9DbpKW6DGTfuQflA2mDZnytGqHP1YmzGoVpjzYqsKMvclYQJhv2p'

export const IO_CONNECT = 'connect'
export const IO_DISCONNECT = 'disconnect'
export const IO_CLIENT_HELLO = 'IO_CLIENT_HELLO'
export const IO_CLIENT_JOIN_ROOM = 'IO_CLIENT_JOIN_ROOM'
export const IO_SERVER_HELLO = 'IO_SERVER_HELLO'


export const API_OPTIONS = {
  clientOrigin: `${WEB_HOST}:${WEB_PORT}`,
  yelpOrigin: 'https://api.yelp.com',
}

export const ERROR_MESSAGES = {
  // Defaults
  default: 'Hmm, an unknown error occured',
  timeout: 'Server Timed Out. Check your internet connection',
  invalidJson: 'Response returned is not valid JSON',
}

export const API_ENDPOINTS = {
  endpoints: new Map([
    ['getYelpAuthToken', '/v1/yelp/getAuth'],
    ['getRestaurants', '/v1/yelp/getRestaurants'],
    ['getRestaurantDetail', '/v1/yelp/getRestaurantDetail'],
    ['getRestaurantReviews', '/v1/yelp/getRestaurantReviews'],
  ]),
}
